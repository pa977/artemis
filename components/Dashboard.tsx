import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { UserProfile, SidebarSection, ChatSession, ChatMessage, Plant, JournalEntry, WeatherData, PlantHealthStatus } from '../types';
import { getChatResponse, getPlantCareInfo, generateDailyTasks, generatePlantHealthStatuses, generateProactiveWeatherAlert } from '../services/geminiService';
import { getWeather } from '../services/weatherService';
import { toggleAmbientMusic } from '../services/soundService';
import MyGarden from './MyGarden';
import Profile from './Profile';
import { motion, AnimatePresence } from 'framer-motion';

// Icons for sidebar sections
import PestControlIcon from './icons/PlantIcon';
import SoilHealthIcon from './icons/ForestIcon';
import GardenPlannerIcon from './icons/BiotechIcon';
import WateringIcon from './icons/ResearchIcon';
import HarvestIcon from './icons/AgricultureIcon';
import CompanionPlantingIcon from './icons/GeneIcon';

// Backgrounds for sidebar sections
import PestIdBackground from './backgrounds/PlantDoctorBackground';
import SoilGuideBackground from './backgrounds/EcoForecasterBackground';
import GardenPlannerBackground from './backgrounds/LabProtocolBackground';
import WateringScheduleBackground from './backgrounds/ResearchSummarizerBackground';
import HarvestGuideBackground from './backgrounds/GreenFarmingBackground';
import CompanionFinderBackground from './backgrounds/GeneEditorBackground';
import DefaultBackground from './backgrounds/DefaultBackground';
import ProfileBackground from './backgrounds/ProfileBackground';

const sidebarSections: SidebarSection[] = [
    { 
        id: 'pest', 
        title: 'Pest & Disease ID', 
        prompt: 'You are an expert plant pathologist. You ONLY help with identifying pests and diseases. If the user asks about anything else (like garden planning, soil, or general care), politely tell them that this specific tool is for Pest & Disease ID and they should use the General Chat or another specialized tool for other queries. Start by asking the user to describe the symptoms or upload a photo.', 
        icon: <PestControlIcon />, 
        background: PestIdBackground 
    },
    { 
        id: 'soil', 
        title: 'Soil Health Guide', 
        prompt: 'You are a soil scientist. You ONLY provide guidance on soil health, composition, and improvement. If the user asks about pests, watering, or harvesting, politely redirect them to the correct tool. Start by asking the user about their current soil type or any issues they are seeing with plant growth.', 
        icon: <SoilHealthIcon />, 
        background: SoilGuideBackground 
    },
    { 
        id: 'planner', 
        title: 'Garden Planner', 
        prompt: 'You are a master gardener specializing in layout and scheduling. You ONLY help with garden planning, crop rotation, and planting schedules. Do not answer questions about specific pest treatments or soil chemistry in detail; redirect those to the appropriate tools. Start by asking what they want to grow and how much space they have.', 
        icon: <GardenPlannerIcon />, 
        background: GardenPlannerBackground 
    },
    { 
        id: 'watering', 
        title: 'Watering Schedule', 
        prompt: 'You are a water conservation and irrigation specialist. You ONLY advise on watering frequencies, methods, and efficiency. Redirect non-watering questions to other tools. Start by asking about the user\'s local climate and the types of plants they are watering.', 
        icon: <WateringIcon />, 
        background: WateringScheduleBackground 
    },
    { 
        id: 'harvest', 
        title: 'Harvest Guide', 
        prompt: 'You are an agricultural harvest expert. You ONLY provide tips on when and how to harvest specific crops for peak flavor and yield. Redirect other questions. Start by asking which crops the user is currently growing.', 
        icon: <HarvestIcon />, 
        background: HarvestGuideBackground 
    },
    { 
        id: 'companion', 
        title: 'Companion Planting', 
        prompt: 'You are a botanist specializing in companion planting. You ONLY suggest beneficial plant pairings and explain why they work together. Redirect other questions. Start by asking which plants the user wants to find companions for.', 
        icon: <CompanionPlantingIcon />, 
        background: CompanionFinderBackground 
    },
];

interface DashboardProps {
    onLogout: () => void;
    userProfile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, userProfile, onUpdateProfile }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chatHistory, setChatHistory] = useState<ChatSession[]>(() => {
        const saved = localStorage.getItem('artemis_chat_history');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [activeView, setActiveView] = useState<'garden' | 'chat' | 'profile'>('garden');
    const [plants, setPlants] = useState<Plant[]>(() => {
        const saved = localStorage.getItem('artemis_plants');
        return saved ? JSON.parse(saved) : [];
    });
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [dailyTasks, setDailyTasks] = useState<string[]>([]);
    const [isAiLoading, setIsAiLoading] = useState(true);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    useEffect(() => {
        localStorage.setItem('artemis_chat_history', JSON.stringify(chatHistory));
    }, [chatHistory]);

    useEffect(() => {
        localStorage.setItem('artemis_plants', JSON.stringify(plants));
    }, [plants]);

    const refreshAiInsights = useCallback(async (currentPlants: Plant[]) => {
        setIsAiLoading(true);

        // Fetch weather first as it might be needed for other AI calls
        const weather = await getWeather();

        // Fetch all AI data in parallel
        const [tasks, statuses, alert] = await Promise.all([
            generateDailyTasks(currentPlants),
            generatePlantHealthStatuses(currentPlants),
            generateProactiveWeatherAlert(currentPlants, weather)
        ]);

        // Update states
        setDailyTasks(tasks);
        setWeatherData({ ...weather, aiSummary: alert });

        const updatedPlants = currentPlants.map(p => ({
            ...p,
            aiHealthStatus: statuses[p.id] || p.aiHealthStatus,
        }));
        setPlants(updatedPlants);

        setIsAiLoading(false);
    }, []);

    useEffect(() => {
        // Initial setup
        if (chatHistory.length > 0) {
            setActiveChatId(chatHistory[0].id);
            setActiveView('chat');
        } else {
            handleNewChat('General Plant Chat');
        }
        
        refreshAiInsights(plants);

        // Cleanup music on component unmount (logout)
        return () => {
            if (isMusicPlaying) {
                toggleAmbientMusic();
            }
        };
    }, []); // Empty dependency array ensures this runs only once.


    const activeChat = chatHistory.find(c => c.id === activeChatId);
    const activeSection = sidebarSections.find(s => s.id === activeChat?.sectionId);
    const ActiveBackground = activeSection?.background || (activeView === 'profile' ? ProfileBackground : DefaultBackground);

    const handleNewChat = async (sectionTitle: string = 'New Chat', sectionId?: string) => {
        const newChatId = `chat-${Date.now()}`;
        const initialMessages: ChatMessage[] = [];

        // If it's a specialized tool, get an initial greeting from the AI
        if (sectionId) {
            const section = sidebarSections.find(s => s.id === sectionId);
            if (section) {
                const greeting = await getChatResponse("Please provide a brief, professional greeting and ask the user a relevant starting question for this tool.", undefined, section.prompt);
                initialMessages.push({
                    id: `msg-init-${Date.now()}`,
                    role: 'assistant',
                    content: greeting
                });
            }
        }

        const newChat: ChatSession = {
            id: newChatId,
            title: sectionTitle,
            messages: initialMessages,
            sectionId,
        };
        setChatHistory(prev => [newChat, ...prev]);
        setActiveChatId(newChatId);
        setActiveView('chat');
    };

    const handleSelectChat = (id: string) => {
        setActiveChatId(id);
        setActiveView('chat');
    };

    const handleDeleteChat = (id: string) => {
        setChatHistory(chatHistory.filter(chat => chat.id !== id));
        if (activeChatId === id) {
            setActiveChatId(chatHistory.length > 1 ? chatHistory.filter(chat => chat.id !== id)[0].id : null);
            if (chatHistory.length <= 1) setActiveView('garden');
        }
    };

    const handleSendMessage = async (prompt: string, image?: File) => {
        if (!activeChatId) {
            handleNewChat('New Chat'); // Creates a new chat if one isn't active
            const newId = `chat-${Date.now()}`;
            const newChat: ChatSession = { id: newId, title: 'New Chat', messages: [], sectionId: undefined };
            setChatHistory(prev => [newChat, ...prev]);
            setActiveChatId(newId);
            setActiveView('chat');
            await sendMessageToChat(newId, prompt, image);
        } else {
            await sendMessageToChat(activeChatId, prompt, image);
        }
    };
    
    const sendMessageToChat = async (chatId: string, prompt: string, image?: File) => {
        const currentChat = chatHistory.find(c => c.id === chatId);
        const section = sidebarSections.find(s => s.id === currentChat?.sectionId);

        const userMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            role: 'user',
            content: prompt,
            image: image ? URL.createObjectURL(image) : undefined
        };

        setChatHistory(prev => prev.map(chat =>
            chat.id === chatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat
        ));

        const responseText = await getChatResponse(prompt, image, section?.prompt);

        const aiMessage: ChatMessage = {
            id: `msg-${Date.now() + 1}`,
            role: 'assistant',
            content: responseText
        };

        setChatHistory(prev => prev.map(chat =>
            chat.id === chatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat
        ));
    };

    const handleAddPlant = async (plant: Omit<Plant, 'id' | 'journal'>) => {
        const careInfo = await getPlantCareInfo(plant.species);
        const newPlant: Plant = {
            ...plant,
            id: `plant-${Date.now()}`,
            journal: [],
            careInfo: careInfo,
        };
        const newPlantList = [...plants, newPlant];
        setPlants(newPlantList);
        await refreshAiInsights(newPlantList); // Refresh insights with the new plant
    };

    const handleAddJournalEntry = (plantId: string, entry: Omit<JournalEntry, 'id'>) => {
        const newEntry: JournalEntry = {
            ...entry,
            id: `entry-${entry.date}`
        };
        const newPlants = plants.map(p => 
            p.id === plantId ? { ...p, journal: [newEntry, ...p.journal] } : p
        );
        setPlants(newPlants);
    };

    const updateAiHealthAnalysis = (plantId: string, entryId: string, analysis: string) => {
         const newPlants = plants.map(p => {
            if (p.id === plantId) {
                const updatedJournal = p.journal.map(entry => 
                    entry.id === entryId ? { ...entry, aiHealthAnalysis: analysis } : entry
                );
                return { ...p, journal: updatedJournal };
            }
            return p;
        });
        setPlants(newPlants);
        refreshAiInsights(newPlants); // Refresh statuses after photo analysis
    }

    const handleToggleMusic = () => {
        const isNowPlaying = toggleAmbientMusic();
        setIsMusicPlaying(isNowPlaying);
    };

    return (
        <div className="flex w-full h-full bg-green-50">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                sections={sidebarSections}
                onLogout={onLogout}
                onNewChat={handleNewChat}
                chatHistory={chatHistory}
                activeChatId={activeChatId}
                onSelectChat={handleSelectChat}
                onDeleteChat={handleDeleteChat}
                activeView={activeView}
                onSetView={setActiveView}
                userProfile={userProfile}
                isMusicPlaying={isMusicPlaying}
                onToggleMusic={handleToggleMusic}
            />
            <main className="relative flex-1 h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection?.id || activeView}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                       <ActiveBackground />
                    </motion.div>
                </AnimatePresence>
                
                <div className="relative w-full h-full">
                    {activeView === 'chat' && activeChat && (
                        <ChatWindow
                            key={activeChat.id}
                            activeSectionTitle={activeSection?.title || activeChat.title}
                            messages={activeChat.messages}
                            onSendMessage={handleSendMessage}
                            onNewChat={() => handleNewChat('General Chat')}
                        />
                    )}
                    {activeView === 'garden' && (
                        <MyGarden 
                            plants={plants} 
                            onAddPlant={handleAddPlant} 
                            onAddJournalEntry={handleAddJournalEntry}
                            updateAiHealthAnalysis={updateAiHealthAnalysis}
                            weatherData={weatherData}
                            tasks={dailyTasks}
                            isLoading={isAiLoading}
                            onRefreshInsights={() => refreshAiInsights(plants)}
                        />
                    )}
                    {activeView === 'profile' && (
                        <Profile userProfile={userProfile} onUpdateProfile={onUpdateProfile} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;