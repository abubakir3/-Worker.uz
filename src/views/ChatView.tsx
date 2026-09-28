import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  ArrowLeft, 
  Building2, 
  User, 
  Check, 
  CheckCheck, 
  Clock, 
  Smile, 
  Paperclip, 
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatView: React.FC = () => {
  const { 
    conversations, 
    messages, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    currentUser,
    navigateTo 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [mobileConversationSelected, setMobileConversationSelected] = useState(Boolean(activeConversationId));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessages = messages.filter(m => m.conversationId === activeConv?.id);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage.trim());
    setInputMessage('');
  };

  const sendQuickReply = (text: string) => {
    if (!activeConv) return;
    sendMessage(activeConv.id, text);
  };

  const isCompany = currentUser?.role === 'company';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden h-[750px] max-h-[82vh] grid grid-cols-1 md:grid-cols-12">
        
        {/* LEFT: Conversation list (Hidden on mobile if conversation is selected) */}
        <div className={`md:col-span-5 lg:col-span-4 border-r border-slate-200 flex flex-col h-full bg-slate-50/50 ${
          mobileConversationSelected ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Xabarlar</span>
              <span className="text-xs font-normal text-slate-500 font-mono">
                {conversations.length} ta yozishma
              </span>
            </h2>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Hozircha xabarlar yo‘q
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = conv.id === activeConv?.id;
                const contactName = isCompany ? conv.jobSeekerName : conv.companyName;
                const contactAvatar = isCompany ? conv.jobSeekerAvatar : conv.companyLogo;
                const unreadCount = isCompany ? conv.unreadCountCompany : conv.unreadCountJobSeeker;

                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setActiveConversationId(conv.id);
                      setMobileConversationSelected(true);
                    }}
                    className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-100/70 bg-white'
                    }`}
                  >
                    <img
                      src={contactAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                      alt={contactName}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {contactName}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {conv.lastMessageTime}
                        </span>
                      </div>

                      {conv.vacancyTitle && (
                        <p className="text-[11px] font-medium text-blue-600 truncate mt-0.5">
                          {conv.vacancyTitle}
                        </p>
                      )}

                      <p className="text-xs text-slate-500 truncate mt-1">
                        {conv.lastMessage}
                      </p>
                    </div>

                    {unreadCount > 0 && (
                      <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT: Active Message Thread */}
        <div className={`md:col-span-7 lg:col-span-8 flex flex-col h-full bg-white ${
          !mobileConversationSelected ? 'hidden md:flex' : 'flex'
        }`}>
          {activeConv ? (
            <>
              {/* Thread Header */}
              <div className="px-4 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileConversationSelected(false)}
                    className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg mr-1"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <img
                    src={isCompany ? activeConv.jobSeekerAvatar : activeConv.companyLogo}
                    alt={isCompany ? activeConv.jobSeekerName : activeConv.companyName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {isCompany ? activeConv.jobSeekerName : activeConv.companyName}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {activeConv.vacancyTitle || 'To‘g‘ridan-to‘g‘ri muloqot'}
                    </p>
                  </div>
                </div>

                {activeConv.vacancyId && (
                  <button
                    onClick={() => navigateTo('vacancy', { vacancyId: activeConv.vacancyId })}
                    className="hidden sm:inline-flex text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Vakansiyani ko‘rish
                  </button>
                )}
              </div>

              {/* Quick Template Replies */}
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  Tezkor javoblar:
                </span>
                {isCompany ? (
                  <>
                    <button
                      onClick={() => sendQuickReply('Rezyumeingiz bilan tanishib chiqdik, ma’qul keldi.')}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 whitespace-nowrap text-[11px]"
                    >
                      Rezyume ma’qul keldi
                    </button>
                    <button
                      onClick={() => sendQuickReply('Sizni qulay vaqtda ofisimizga suhbatga taklif qilamiz.')}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 whitespace-nowrap text-[11px]"
                    >
                      Suhbatga taklif
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => sendQuickReply('Rahmat, taklifingizni qabul qilaman.')}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 whitespace-nowrap text-[11px]"
                    >
                      Taklifni qabul qilaman
                    </button>
                    <button
                      onClick={() => sendQuickReply('Suhbat vaqti men uchun juda qulay.')}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 whitespace-nowrap text-[11px]"
                    >
                      Vaqt ma’qul
                    </button>
                  </>
                )}
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-slate-50/30">
                {activeMessages.map((msg) => {
                  const isMyMessage = isCompany 
                    ? msg.senderRole === 'company' 
                    : msg.senderRole === 'jobseeker';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                          isMyMessage
                            ? 'bg-blue-600 text-white rounded-tr-xs'
                            : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div
                          className={`flex items-center justify-end gap-1 text-[10px] mt-1 font-mono ${
                            isMyMessage ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          <span>{msg.timestamp}</span>
                          {isMyMessage && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Xabaringizni yozing..."
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition-colors"
                  title="Yuborish"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
              Suhbatni boshlash uchun chap tomondan yozishmani tanlang
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
