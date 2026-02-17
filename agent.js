// JUBA CONSULTANTS ADVANCED AI Agent - Enhanced Version
// Features: Voice I/O, Learning, Sentiment Detection, Auto-complete, History, Navigation

class JubaAIAgent {
    constructor() {
        this.conversationHistory = [];
        this.userName = null;
        this.currentContext = [];
        this.questionFrequency = this.loadQuestionFrequency();
        this.userSentiment = 'neutral';
        this.conversationCount = 0;
        this.initializeKnowledgeBase();
        this.initializePatterns();
        this.initializeSpeechRecognition();
        this.initializeSpeechSynthesis();
        this.loadChatHistory();
        this.initializeWebsiteContent();
        this.initializeDocuments();
    }
    
    // Voice Recognition Setup
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
        } else {
            this.recognition = null;
        }
    }
    
    // Voice Synthesis Setup
    initializeSpeechSynthesis() {
        this.synth = window.speechSynthesis;
        this.voiceEnabled = true;
    }
    
    // Load previous question patterns from localStorage
    loadQuestionFrequency() {
        const stored = localStorage.getItem('juba_question_frequency');
        return stored ? JSON.parse(stored) : {};
    }
    
    // Save question frequency
    saveQuestionFrequency() {
        localStorage.setItem('juba_question_frequency', JSON.stringify(this.questionFrequency));
    }
    
    // Load chat history
    loadChatHistory() {
        const stored = localStorage.getItem('juba_chat_history');
        if (stored) {
            this.conversationHistory = JSON.parse(stored);
        }
    }
    
    // Save chat history
    saveChatHistory() {
        localStorage.setItem('juba_chat_history', JSON.stringify(this.conversationHistory));
    }
    
    // Website content for search
    initializeWebsiteContent() {
        this.websiteContent = {
            pages: {
                home: { title: 'Home', url: 'index.html', keywords: ['home', 'main', 'welcome', 'about us'] },
                skills: { title: 'Skills Development', url: 'skills-academy.html', keywords: ['training', 'skills', 'learnership', 'seta', 'courses'] },
                ai: { title: 'AI Breakthrough', url: 'ai-breakthrough.html', keywords: ['ai', 'artificial intelligence', 'machine learning', 'quantum'] },
                ict: { title: 'ICT Solutions', url: 'ict-space-hub.html', keywords: ['software', 'web', 'app', 'mobile', 'development'] }
            }
        };
    }
    
    // Document knowledge base
    initializeDocuments() {
        this.documents = {
            'training-brochure': {
                title: 'Training Programs Brochure',
                content: 'JUBA offers SETA-accredited training programs including Project Management, Business Analytics, and Leadership Development.',
                keywords: ['training', 'courses', 'programs', 'seta']
            },
            'ai-services': {
                title: 'AI Services Overview',
                content: 'Our AI division provides workshops, custom AI solutions, machine learning implementations, and quantum computing research.',
                keywords: ['ai', 'artificial intelligence', 'services', 'workshops']
            },
            'company-profile': {
                title: 'Company Profile',
                content: 'JUBA CONSULTANTS is a black female-owned company in KZN specializing in skills development, AI innovation, and ICT solutions.',
                keywords: ['company', 'profile', 'about', 'black owned', 'female owned']
            }
        };
    }

    initializeKnowledgeBase() {
        this.knowledgeBase = {
            company: {
                name: "JUBA CONSULTANTS",
                fullName: "JUBA CONSULTANTS (Pty) Ltd",
                type: "Black female-owned professional consulting company",
                location: "KwaZulu-Natal, South Africa",
                address: "27 Magwaza Maphalala St, Greyville, Durban, 4001",
                mission: "Empowering individuals, communities, and organizations through education, technology, and future-focused digital solutions",
                focus: "Socio-economic development and sustainable transformation",
                phone: "068 382 5733",
                whatsapp: "+27683825733",
                emails: {
                    general: ["jubaskillsdev@gmail.com", "jubaskillscomm@gmail.com"],
                    training: "training.academy@jubaconsultants.co.za",
                    director: "sne.khathi@jubaconsultants.co.za",
                    technical: "techdirector@jubaconsultants.co.za"
                },
                values: [
                    { name: "Innovation-Driven", desc: "Pioneering cutting-edge solutions in AI and technology" },
                    { name: "Community-Focused", desc: "Dedicated to socio-economic development and transformation" },
                    { name: "Education-Centered", desc: "Empowering through knowledge and skills development" },
                    { name: "Future-Ready", desc: "Preparing individuals and organizations for tomorrow" }
                ]
            },
            divisions: {
                skills: {
                    name: "Juba Skills Development and Training",
                    number: "Division 1",
                    description: "Accredited training programmes, learnerships, and comprehensive skills development solutions",
                    services: [
                        "SETA-Accredited Programmes",
                        "Learnerships & Skills Programmes",
                        "Corporate Training Solutions",
                        "Project Management Services",
                        "Workplace Skills Plans",
                        "Workforce Transformation"
                    ],
                    features: "Empowering individuals through SETA-approved qualifications and corporate training initiatives",
                    url: "skills-academy.html"
                },
                ai: {
                    name: "AI Breakthrough",
                    number: "Division 2",
                    description: "Innovation-driven division focused on introducing, simplifying, and applying Artificial Intelligence",
                    services: [
                        "AI Education & Workshops",
                        "Intelligent Web Applications",
                        "AI Solution Development",
                        "Quantum Computing Research",
                        "Machine Learning Solutions",
                        "AI Consulting",
                        "AI for Communities"
                    ],
                    features: "Making AI accessible and practical for everyone",
                    url: "ai-breakthrough.html"
                },
                ict: {
                    name: "ICT and Technology Solutions",
                    number: "Division 3",
                    description: "Comprehensive technology solutions including custom software development and digital transformation",
                    services: [
                        "Custom Software Development",
                        "Web & Mobile Applications",
                        "Digital Transformation",
                        "Technology Training",
                        "Enterprise Solutions",
                        "Cloud Solutions",
                        "IT Consulting"
                    ],
                    features: "Delivering enterprise-grade ICT solutions",
                    url: "ict-space-hub.html"
                }
            }
        };
    }

    initializePatterns() {
        // Intent patterns for natural language understanding
        this.intentPatterns = {
            greeting: /\b(hi|hello|hey|good morning|good afternoon|good evening|greetings|howdy|sup)\b/i,
            goodbye: /\b(bye|goodbye|see you|farewell|later|talk later|gotta go)\b/i,
            thanks: /\b(thank|thanks|appreciate|grateful|thx)\b/i,
            
            // Company related
            about: /\b(about|who are|what is|tell me about|info about|information about|describe|what does)\b.*\b(juba|company|you|organization)\b/i,
            location: /\b(where|location|address|office|situated|based|find you)\b/i,
            contact: /\b(contact|reach|call|phone|email|whatsapp|get in touch|communicate)\b/i,
            ownership: /\b(owner|who owns|black owned|female owned|women owned|ownership)\b/i,
            values: /\b(values|mission|vision|principles|believe in|stand for)\b/i,
            
            // Skills Division
            skills: /\b(skills|training|learnership|seta|accredited|qualification|course|corporate training|workforce|project management)\b/i,
            accreditation: /\b(accred|seta|approved|certified|qualification|recognized)\b/i,
            
            // AI Division
            ai: /\b(ai|artificial intelligence|machine learning|ml|quantum|intelligent|automation|breakthrough)\b/i,
            aiServices: /\b(ai service|ai solution|ai workshop|ai education|ai training|ai development)\b/i,
            
            // ICT Division
            ict: /\b(ict|software|web|app|mobile|development|digital|technology|coding|programming|system)\b/i,
            webDev: /\b(website|web app|web development|web design|web solution)\b/i,
            mobileDev: /\b(mobile|app development|android|ios|mobile app)\b/i,
            
            // Services & Solutions
            services: /\b(service|what do|what can|offer|provide|solution|help with)\b/i,
            pricing: /\b(price|cost|fee|charge|rate|pricing|quote|estimate|budget)\b/i,
            howToStart: /\b(how to start|get started|begin|first step|enroll|register|sign up|apply)\b/i,
            
            // Division comparison
            divisions: /\b(division|departments|sections|all services|everything you do)\b/i,
            difference: /\b(difference|distinguish|compare|versus|vs|different)\b/i,
            
            // Help & Navigation
            help: /\b(help|assist|support|guide|confused|don't understand)\b/i,
            capabilities: /\b(what can you|can you help|are you able|capabilities)\b/i,
            
            // Navigation commands
            navigate: /\b(take me|go to|show me|navigate|open|visit)\b.*\b(page|site|website)\b/i,
            
            // Sentiment indicators
            frustrated: /\b(frustrat|annoyed|upset|angry|mad|stupid|useless|waste)\b/i,
            happy: /\b(great|awesome|perfect|excellent|amazing|wonderful|love|fantastic)\b/i,
            confused: /\b(confus|don't understand|unclear|lost|not sure|what do you mean)\b/i
        };
        
        // Out-of-scope topics (things JUBA doesn't offer)
        this.outOfScopePatterns = {
            medical: /\b(medical|health|doctor|hospital|clinic|medicine|healthcare|nursing)\b/i,
            legal: /\b(legal|lawyer|attorney|law firm|court|litigation)\b/i,
            finance: /\b(loan|mortgage|banking|investment|financial advisor|insurance|credit)\b/i,
            retail: /\b(shop|store|buy products|sell products|e-commerce|retail)\b/i,
            hospitality: /\b(hotel|restaurant|catering|accommodation|tourism)\b/i,
            construction: /\b(building construction|civil engineering|architecture firm)\b/i,
            manufacturing: /\b(manufacturing|production line|factory|industrial equipment)\b/i,
            agriculture: /\b(farming|agriculture|crops|livestock)\b/i,
            automotive: /\b(car repair|auto mechanic|vehicle sales)\b/i,
            real_estate: /\b(property sales|real estate agent|buying house)\b/i,
            general_unrelated: /\b(weather|sports|celebrity|news|politics|games|movies|recipes|entertainment)\b/i
        };
        
        // Services the company DOES offer (for comparison)
        this.inScopeKeywords = [
            'training', 'skills', 'learnership', 'seta', 'accredited', 'education', 'course',
            'ai', 'artificial intelligence', 'machine learning', 'quantum', 'automation',
            'software', 'web', 'app', 'mobile', 'development', 'ict', 'technology', 'digital',
            'consulting', 'workshop', 'project management', 'corporate training'
        ];
        
        // Common questions for autocomplete
        this.commonQuestions = [
            "Tell me about your training programs",
            "What AI services do you offer?",
            "How do I contact you?",
            "Where is your office located?",
            "What are your prices?",
            "How do I get started?",
            "Tell me about ICT solutions",
            "What makes you different?",
            "Do you offer mobile app development?",
            "Can you help with AI training?",
            "What is a learnership?",
            "Are you SETA accredited?"
        ];
    }
    
    // Detect user sentiment
    detectSentiment(message) {
        const lower = message.toLowerCase();
        
        if (this.intentPatterns.frustrated.test(lower)) {
            this.userSentiment = 'frustrated';
        } else if (this.intentPatterns.happy.test(lower)) {
            this.userSentiment = 'happy';
        } else if (this.intentPatterns.confused.test(lower)) {
            this.userSentiment = 'confused';
        } else {
            this.userSentiment = 'neutral';
        }
        
        return this.userSentiment;
    }
    
    // Check if question is out of scope
    isOutOfScope(message) {
        const lower = message.toLowerCase();
        
        // Check if it matches any out-of-scope patterns
        for (const [category, pattern] of Object.entries(this.outOfScopePatterns)) {
            if (pattern.test(lower)) {
                // Double-check it's not also in-scope (e.g., "technology training")
                const hasInScopeKeywords = this.inScopeKeywords.some(keyword => 
                    lower.includes(keyword)
                );
                
                if (!hasInScopeKeywords) {
                    return { isOutOfScope: true, category: category };
                }
            }
        }
        
        return { isOutOfScope: false, category: null };
    }
    
    // Generate out-of-scope response
    generateOutOfScopeResponse(category) {
        const categoryResponses = {
            medical: "I appreciate your question, but JUBA CONSULTANTS doesn't offer medical or healthcare services. We specialize in **skills development, AI solutions, and ICT services**. However, if you need **technology solutions for healthcare** or **training for healthcare professionals**, we might be able to help! Would you like to know more about our services?",
            legal: "Thank you for asking! While we don't provide legal services, JUBA CONSULTANTS excels in **skills training, AI innovation, and technology solutions**. If you need **technology for legal practice management** or **training in legal tech**, we'd be happy to discuss that! How can we assist you with our core services?",
            finance: "I understand your interest, but financial services aren't part of what we offer. JUBA CONSULTANTS focuses on **skills development, AI solutions, and ICT services**. However, if you need **financial software development** or **training in financial technology**, that's something we can help with! Would you like to explore our ICT division?",
            retail: "Thanks for reaching out! We don't operate in retail or e-commerce sales. Our expertise is in **skills training, AI technology, and software development**. But if you need **e-commerce platform development** or **retail staff training**, we can definitely assist! Want to learn more about our services?",
            hospitality: "I appreciate the inquiry! While we don't provide hospitality services, JUBA CONSULTANTS specializes in **skills development, AI solutions, and technology**. If you're in hospitality and need **staff training**, **booking systems**, or **hotel management software**, we can help! Would you like to discuss our solutions?",
            construction: "Thank you for asking! We don't offer construction services, but we excel in **skills training, AI technology, and software development**. If you need **project management training**, **construction management software**, or **workforce development for construction**, we're here to help! Interested in our services?",
            manufacturing: "I understand, but manufacturing isn't our focus. JUBA CONSULTANTS specializes in **skills development, AI solutions, and ICT services**. However, if you need **manufacturing software**, **automation solutions**, or **workforce training for manufacturing**, we can assist! Would you like to know more?",
            agriculture: "Thanks for reaching out! While agriculture isn't our specialty, we focus on **skills training, AI innovation, and technology solutions**. If you need **agricultural software**, **data analytics for farming**, or **training for agricultural workers**, we might be able to help! Would you like to explore our offerings?",
            automotive: "I appreciate the question! We don't provide automotive services, but JUBA CONSULTANTS excels in **skills development, AI solutions, and technology**. If you need **automotive training programs** or **garage management software**, we could assist! Want to learn about our services?",
            real_estate: "Thank you for asking! Real estate sales aren't part of our services. We specialize in **skills training, AI technology, and software development**. However, if you need **property management software** or **real estate professional training**, we can help! Would you like to know more?",
            general_unrelated: "I appreciate your message! However, that's not something JUBA CONSULTANTS specializes in. We focus on **skills development training**, **AI innovation**, and **ICT solutions**. Is there anything related to professional training, technology development, or AI that I can help you with today? 😊"
        };
        
        const response = categoryResponses[category] || 
            "Thank you for your question! That's outside the scope of what JUBA CONSULTANTS offers. We specialize in:\n\n🎓 **Skills Development & Training**\n🤖 **AI Breakthrough Solutions**\n💻 **ICT & Technology Services**\n\nIs there anything within these areas I can help you with today?";
        
        return {
            text: response,
            suggestions: ['What services do you offer?', 'Tell me about your divisions', 'How can I get in touch?']
        };
    }
    
    // Track question frequency for learning
    trackQuestion(intent) {
        if (intent) {
            this.questionFrequency[intent] = (this.questionFrequency[intent] || 0) + 1;
            this.saveQuestionFrequency();
        }
    }
    
    // Get suggested questions based on context
    getSuggestedQuestions(currentIntent) {
        const suggestions = [];
        
        // Context-based suggestions
        if (currentIntent === 'skills') {
            suggestions.push('How do I enroll in training?', 'What qualifications do you offer?', 'Tell me about corporate training');
        } else if (currentIntent === 'ai') {
            suggestions.push('Can you explain AI workshops?', 'What is quantum computing?', 'How can AI help my business?');
        } else if (currentIntent === 'ict') {
            suggestions.push('Can you build mobile apps?', 'Tell me about web development', 'What is digital transformation?');
        } else if (currentIntent === 'contact') {
            suggestions.push('How do I schedule a meeting?', 'What are your office hours?', 'Can I visit your office?');
        } else {
            // General suggestions
            suggestions.push('Tell me about your divisions', 'What services do you offer?', 'How do I get started?');
        }
        
        return suggestions;
    }
    
    // Search website content
    searchWebsite(query) {
        const lower = query.toLowerCase();
        const matches = [];
        
        for (const [key, page] of Object.entries(this.websiteContent.pages)) {
            if (page.keywords.some(keyword => lower.includes(keyword))) {
                matches.push(page);
            }
        }
        
        return matches;
    }
    
    // Handle navigation commands
    handleNavigation(message) {
        const lower = message.toLowerCase();
        
        if (lower.includes('skills') || lower.includes('training')) {
            return { url: 'skills-academy.html', title: 'Skills Development' };
        } else if (lower.includes('ai') || lower.includes('artificial')) {
            return { url: 'ai-breakthrough.html', title: 'AI Breakthrough' };
        } else if (lower.includes('ict') || lower.includes('software') || lower.includes('web')) {
            return { url: 'ict-space-hub.html', title: 'ICT Solutions' };
        } else if (lower.includes('home') || lower.includes('main')) {
            return { url: 'index.html', title: 'Home' };
        }
        
        return null;
    }
    
    // Search documents
    searchDocuments(query) {
        const lower = query.toLowerCase();
        const results = [];
        
        for (const [key, doc] of Object.entries(this.documents)) {
            if (doc.keywords.some(keyword => lower.includes(keyword))) {
                results.push(doc);
            }
        }
        
        return results;
    }
    
    // Get autocomplete suggestions
    getAutocompleteSuggestions(input) {
        if (input.length < 2) return [];
        
        const lower = input.toLowerCase();
        return this.commonQuestions
            .filter(q => q.toLowerCase().includes(lower))
            .slice(0, 5);
    }

    // Analyze user message and determine intent (Enhanced with sentiment)
    analyzeIntent(message) {
        const intents = [];
        const lowerMessage = message.toLowerCase();
        
        // Check if out of scope first
        const scopeCheck = this.isOutOfScope(message);
        if (scopeCheck.isOutOfScope) {
            return {
                intents: ['out_of_scope'],
                keywords: {},
                sentiment: this.detectSentiment(message),
                navigation: null,
                docResults: [],
                context: this.currentContext,
                originalMessage: message,
                outOfScope: scopeCheck.category
            };
        }
        
        for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
            if (pattern.test(lowerMessage)) {
                intents.push(intent);
            }
        }
        
        // Detect sentiment
        const sentiment = this.detectSentiment(message);
        
        // Contextual keywords for better understanding
        const keywords = {
            skills: lowerMessage.match(/\b(skills|training|learner|course|seta)\b/g),
            ai: lowerMessage.match(/\b(ai|artificial|intelligence|quantum|machine learning)\b/g),
            ict: lowerMessage.match(/\b(software|web|app|mobile|development|ict|technology)\b/g)
        };
        
        // Check for navigation commands
        const navigation = this.handleNavigation(message);
        
        // Search documents
        const docResults = this.searchDocuments(message);
        
        // Update conversation context (last 3 intents)
        if (intents.length > 0) {
            this.currentContext.push(intents[0]);
            if (this.currentContext.length > 3) {
                this.currentContext.shift();
            }
        }
        
        return { 
            intents, 
            keywords, 
            sentiment, 
            navigation, 
            docResults,
            context: this.currentContext,
            originalMessage: message,
            outOfScope: null
        };
    }

    // Generate intelligent conversational response (Enhanced with sentiment awareness)
    generateResponse(analysis) {
        const { intents, keywords, sentiment, navigation, docResults, outOfScope, originalMessage } = analysis;
        
        // Handle out-of-scope questions FIRST
        if (intents.includes('out_of_scope') && outOfScope) {
            return this.generateOutOfScopeResponse(outOfScope);
        }
        
        // Track question for learning
        if (intents.length > 0) {
            this.trackQuestion(intents[0]);
        }
        
        // Handle navigation commands
        if (intents.includes('navigate') && navigation) {
            return {
                text: `I'll take you to the **${navigation.title}** page! 🚀\n\nClick here to visit: [${navigation.title}](${navigation.url})\n\nOr I can tell you more about what's on that page. What would you prefer?`,
                navigation: navigation
            };
        }
        
        // Sentiment-based response adjustments
        let sentimentPrefix = '';
        if (sentiment === 'frustrated') {
            sentimentPrefix = "I sense you might be a bit frustrated. Let me help you better! 😊 ";
        } else if (sentiment === 'confused') {
            sentimentPrefix = "I understand this might be confusing. Let me explain more clearly: ";
        } else if (sentiment === 'happy') {
            sentimentPrefix = "I'm so glad you're happy! 😊 ";
        }
        
        // Greeting responses
        if (intents.includes('greeting')) {
            const greetings = [
                `${sentimentPrefix}Hi there! 😊 I'm the JUBA CONSULTANTS virtual assistant. I can help you learn about our skills development, AI solutions, and ICT services. What would you like to know?`,
                `${sentimentPrefix}Hello! Welcome to JUBA CONSULTANTS! 👋 I can tell you all about our three divisions - Skills Development, AI Breakthrough, and ICT Solutions. What interests you?`,
                `${sentimentPrefix}Hey! Great to meet you! I'm your guide to JUBA CONSULTANTS. Whether you're interested in training programs, AI innovation, or technology solutions, I'm here to help. What can I tell you about?`
            ];
            return { text: this.randomChoice(greetings), suggestions: ['Tell me about your divisions', 'What services do you offer?', 'How do I contact you?'] };
        }
        
        // Goodbye responses
        if (intents.includes('goodbye')) {
            const goodbyes = [
                `${sentimentPrefix}It was great chatting with you! Feel free to reach out anytime at 068 382 5733 or jubaskillsdev@gmail.com. Have a wonderful day! 👋`,
                `${sentimentPrefix}Thank you for your interest in JUBA CONSULTANTS! Don't hesitate to contact us if you need anything else. Take care! 😊`,
                `${sentimentPrefix}Goodbye! Remember, we're always here to help with your skills development, AI, or technology needs. Talk soon! 🌟`
            ];
            return { text: this.randomChoice(goodbyes) };
        }
        
        // Thanks responses
        if (intents.includes('thanks')) {
            const thanks = [
                `${sentimentPrefix}You're very welcome! Is there anything else you'd like to know about JUBA CONSULTANTS? 😊`,
                `${sentimentPrefix}Happy to help! Feel free to ask if you have more questions about our services or divisions.`,
                `${sentimentPrefix}My pleasure! If you need any more information, just ask!`
            ];
            const currentIntent = intents[1] || this.currentContext[this.currentContext.length - 1];
            return { text: this.randomChoice(thanks), suggestions: this.getSuggestedQuestions(currentIntent) };
        }
        
        // About company
        if (intents.includes('about')) {
            return { 
                text: `${sentimentPrefix}JUBA CONSULTANTS is a **black female-owned** professional consulting company based in **KwaZulu-Natal, South Africa**. 🇿🇦\n\nWe're not just another consulting firm - we're passionate about **empowering individuals, communities, and organizations** through three strategic divisions:\n\n1. **Skills Development & Training** - Accredited programmes and learnerships\n2. **AI Breakthrough** - Making artificial intelligence accessible to everyone\n3. **ICT & Technology Solutions** - Custom software and digital transformation\n\nOur mission is to drive socio-economic development and sustainable transformation through education and technology. What specific aspect would you like to explore?`,
                suggestions: ['Tell me about Skills Development', 'What AI services do you offer?', 'Show me ICT solutions']
            };
        }
        
        // Company values
        if (intents.includes('values')) {
            return { 
                text: `${sentimentPrefix}At JUBA CONSULTANTS, we're guided by four core values:\n\n💡 **Innovation-Driven** - We pioneer cutting-edge solutions in AI and technology\n\n❤️ **Community-Focused** - We're dedicated to socio-economic development and transformation\n\n🎓 **Education-Centered** - We empower through knowledge and skills development\n\n🌍 **Future-Ready** - We prepare individuals and organizations for tomorrow's challenges\n\nThese values shape everything we do, from our training programmes to our AI innovations. Want to know more about any specific area?`,
                suggestions: ['Tell me about training programs', 'How do you help communities?', 'What makes you innovative?']
            };
        }
        
        // Location & Contact
        if (intents.includes('location')) {
            return { 
                text: `${sentimentPrefix}You can find us at:\n\n📍 **27 Magwaza Maphalala St**\nGreyville, Durban, 4001\nKwaZulu-Natal, South Africa\n\nWe're conveniently located in Durban and serve clients throughout KwaZulu-Natal and beyond. Would you like our contact details to get in touch?`,
                suggestions: ['How do I contact you?', 'What are your office hours?', 'Can I visit your office?']
            };
        }
        
        if (intents.includes('contact')) {
            return { 
                text: `${sentimentPrefix}Here's how you can reach us:\n\n📞 **Phone/WhatsApp:** 068 382 5733\n\n📧 **Email:**\n• General: jubaskillsdev@gmail.com\n• Training: training.academy@jubaconsultants.co.za\n• Director: sne.khathi@jubaconsultants.co.za\n• Technical: techdirector@jubaconsultants.co.za\n\n📍 **Office:** 27 Magwaza Maphalala St, Greyville, Durban\n\nYou can also click the WhatsApp button on this page to chat with us directly! What would you like to discuss?`,
                suggestions: ['Tell me about your services', 'How do I get started?', 'Where is your office?']
            };
        }
        
        // Ownership
        if (intents.includes('ownership')) {
            return { 
                text: `${sentimentPrefix}JUBA CONSULTANTS is proudly a **black female-owned** enterprise! 🌟\n\nWe're committed to transformation, empowerment, and diversity in the South African business landscape. Our leadership brings passion, innovation, and a deep understanding of community needs to everything we do.\n\nAs a female-owned business, we're particularly passionate about empowering others through skills development, making technology accessible, and creating opportunities for growth. Would you like to know more about our work?`,
                suggestions: ['Tell me about your mission', 'What services do you offer?', 'How do I work with you?']
            };
        }
        
        // Skills Division
        if (intents.includes('skills') || keywords.skills) {
            return { 
                text: `${sentimentPrefix}Our **Skills Development & Training Division** is all about empowering people! 🎓\n\nWe offer:\n✅ **SETA-Accredited Programmes** - Recognized qualifications\n✅ **Learnerships & Skills Programmes** - Hands-on learning\n✅ **Corporate Training Solutions** - Customized for your team\n✅ **Project Management Services** - Professional delivery\n\nWhether you're an individual looking to upskill or an organization needing training solutions, we've got you covered. We work with SETAs and deliver quality, accredited training that makes a real difference.\n\nWant to know about specific courses or how to enroll?`,
                suggestions: ['How do I enroll?', 'What qualifications do you offer?', 'Tell me about corporate training'],
                navigation: { url: 'skills-academy.html', title: 'Skills Development' }
            };
        }
        
        // AI Division
        if (intents.includes('ai') || intents.includes('aiServices') || keywords.ai) {
            return { 
                text: `${sentimentPrefix}Welcome to **AI Breakthrough** - where we make artificial intelligence accessible and practical! 🧠✨\n\nOur AI division offers:\n🤖 **AI Education & Workshops** - Learn AI from the ground up\n🌐 **Intelligent Web Applications** - AI-powered solutions\n💡 **AI Solution Development** - Custom AI for your needs\n🔬 **Quantum Computing Research** - Future technology today\n📊 **Machine Learning Solutions** - Data-driven insights\n\nWe believe AI shouldn't be intimidating - it should be empowering! Whether you're a community organization, business, or individual, we can help you understand and apply AI practically. What aspect of AI interests you most?`,
                suggestions: ['Tell me about AI workshops', 'How can AI help my business?', 'What is quantum computing?'],
                navigation: { url: 'ai-breakthrough.html', title: 'AI Breakthrough' }
            };
        }
        
        // ICT Division
        if (intents.includes('ict') || intents.includes('webDev') || intents.includes('mobileDev') || keywords.ict) {
            return { 
                text: `${sentimentPrefix}Our **ICT & Technology Solutions Division** delivers enterprise-grade digital solutions! 💻🚀\n\nWe specialize in:\n🌐 **Custom Software Development** - Tailored to your needs\n📱 **Web & Mobile Applications** - Beautiful, functional apps\n🔄 **Digital Transformation** - Modernize your operations\n💼 **Enterprise Solutions** - Scalable business systems\n☁️ **Cloud Solutions** - Modern infrastructure\n👨‍💻 **Technology Training** - Build your team's capabilities\n\nFrom startups to established enterprises, we create technology solutions that drive real business results. Need a website, mobile app, or custom software? Let's talk!`,
                suggestions: ['Can you build mobile apps?', 'Tell me about web development', 'What is digital transformation?'],
                navigation: { url: 'ict-space-hub.html', title: 'ICT Solutions' }
            };
        }
        
        // All divisions overview
        if (intents.includes('divisions') || intents.includes('services')) {
            return { 
                text: `${sentimentPrefix}JUBA CONSULTANTS operates through **three strategic divisions**, each designed to address specific needs:\n\n**1️⃣ Skills Development & Training**\nAccredited training, learnerships, and corporate training solutions. Perfect for individuals and organizations focusing on workforce development.\n\n**2️⃣ AI Breakthrough**\nMaking artificial intelligence accessible through education, workshops, and practical AI solutions. We demystify AI and make it work for everyone.\n\n**3️⃣ ICT & Technology Solutions**\nCustom software development, web/mobile apps, and digital transformation services. We build the technology infrastructure you need to succeed.\n\nThese divisions work together seamlessly to provide comprehensive solutions. Which one interests you most?`,
                suggestions: ['Tell me about Skills Development', 'What AI services do you offer?', 'Show me ICT solutions']
            };
        }
        
        // Pricing
        if (intents.includes('pricing')) {
            return { 
                text: `${sentimentPrefix}Great question! Our pricing varies depending on the specific service and your unique requirements. 💰\n\nHere's how we work:\n• **Skills Training** - Depends on programme type and learner numbers\n• **AI Solutions** - Customized based on project scope\n• **ICT Development** - Tailored to your specific needs\n\nEvery client is different, so we prefer to understand your needs first and then provide a detailed, transparent quote. This ensures you get exactly what you need without paying for what you don't.\n\nWould you like to discuss your specific requirements? You can reach out to us at:\n📞 068 382 5733\n📧 jubaskillsdev@gmail.com`,
                suggestions: ['How do I get a quote?', 'How do I contact you?', 'Tell me about your services']
            };
        }
        
        // How to get started
        if (intents.includes('howToStart')) {
            return { 
                text: `${sentimentPrefix}Getting started with JUBA CONSULTANTS is easy! Here's what to do:\n\n**Step 1:** Identify your needs\n• Need training? → Skills Development Division\n• Interested in AI? → AI Breakthrough Division\n• Need software/digital solutions? → ICT Division\n\n**Step 2:** Reach out to us\n📞 Call/WhatsApp: 068 382 5733\n📧 Email: jubaskillsdev@gmail.com\n\n**Step 3:** Let's chat!\nWe'll discuss your specific needs, goals, and how we can help.\n\n**Step 4:** We create a solution\nCustomized proposal tailored to your requirements.\n\n**Step 5:** Let's make it happen!\nWe get to work delivering excellence.\n\nWhat area would you like to explore first?`,
                suggestions: ['Tell me about training', 'Show me AI services', 'Tell me about ICT']
            };
        }
        
        // Help & Capabilities
        if (intents.includes('help') || intents.includes('capabilities')) {
            return { 
                text: `${sentimentPrefix}I'm here to help you discover what JUBA CONSULTANTS can do for you! 😊\n\nI can tell you about:\n🎓 Our **skills training programmes** and accreditations\n🤖 Our **AI solutions** and workshops\n💻 Our **technology development** services\n🏢 The company's **background and values**\n📞 How to **contact us** and get started\n💼 **Specific services** in any division\n\n🎤 **Pro tip:** You can also use the microphone button to talk to me!\n\nJust ask me anything! For example:\n• "Tell me about your training courses"\n• "What AI services do you offer?"\n• "Can you build a mobile app?"\n• "How do I contact you?"\n\nWhat would you like to know?`,
                suggestions: ['Tell me about your divisions', 'How do I get started?', 'What services do you offer?']
            };
        }
        
        // Difference between divisions
        if (intents.includes('difference')) {
            return { 
                text: `${sentimentPrefix}Great question! Let me clarify the differences:\n\n**Skills Development** 🎓 focuses on **people development** - training, qualifications, and workforce transformation. Think education and career growth.\n\n**AI Breakthrough** 🧠 focuses on **artificial intelligence** - making AI understandable and applicable. It's about innovation and future technology.\n\n**ICT Solutions** 💻 focuses on **building technology** - websites, apps, software systems. It's about creating digital tools and platforms.\n\n**How they work together:**\nYou might train your team (Skills), develop an AI strategy (AI Breakthrough), and build the software to implement it (ICT)!\n\nWhich area matches your current needs?`,
                suggestions: ['Tell me about Skills Development', 'What AI services do you offer?', 'Show me ICT solutions']
            };
        }
        
        // Default intelligent response with keyword analysis
        return this.generateContextualResponse(analysis);
    }

    generateContextualResponse(analysis) {
        const { keywords, sentiment, originalMessage } = analysis;
        
        let sentimentPrefix = '';
        if (sentiment === 'frustrated') {
            sentimentPrefix = "I sense you might be a bit frustrated. Let me help you better! 😊 ";
        } else if (sentiment === 'confused') {
            sentimentPrefix = "I understand this might be confusing. Let me explain more clearly: ";
        }
        
        // Check for specific keywords and provide relevant information
        if (keywords.skills && keywords.ai) {
            return { 
                text: `${sentimentPrefix}Interesting - you're asking about both skills training and AI! 🎓🤖\n\nActually, we can combine these:\n• Our **Skills Division** can provide **AI training** courses\n• Our **AI Division** creates **educational workshops** about artificial intelligence\n\nWe believe in making AI accessible through education. Would you like to know more about AI training programmes, or are you interested in AI solutions for your organization?`,
                suggestions: ['Tell me about AI training', 'What AI solutions do you offer?', 'How do I enroll?']
            };
        }
        
        if (keywords.skills && keywords.ict) {
            return { 
                text: `${sentimentPrefix}You're interested in skills and technology - perfect combination! 🎓💻\n\nWe offer:\n• **Technology training** through our Skills Division\n• **Software development** through our ICT Division\n\nWhether you want to learn technology skills or need technology solutions built, we've got you covered. Which interests you more?`,
                suggestions: ['Tell me about tech training', 'What software can you build?', 'How do I get started?']
            };
        }
        
        // Generic helpful response
        return { 
            text: `${sentimentPrefix}I'd love to help you with that! Let me share some quick info:\n\nJUBA CONSULTANTS offers comprehensive solutions through three divisions:\n• **Skills Development** - Training and qualifications\n• **AI Breakthrough** - Artificial intelligence solutions\n• **ICT Solutions** - Software and digital services\n\nCould you tell me more specifically what you're looking for? Or ask me:\n• "What training do you offer?"\n• "Tell me about AI services"\n• "Can you build software?"\n• "How do I contact you?"`,
            suggestions: ['Tell me about your divisions', 'How do I contact you?', 'What services do you offer?']
        };
    }
    
    // Helper method to choose random response
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Main chat method (Enhanced with history saving)
    chat(userMessage) {
        // Add to conversation history
        this.conversationHistory.push({ 
            role: 'user', 
            message: userMessage,
            timestamp: new Date().toISOString()
        });
        
        // Analyze intent and generate response
        const analysis = this.analyzeIntent(userMessage);
        const responseObj = this.generateResponse(analysis);
        
        // Handle response text (backward compatible)
        const responseText = typeof responseObj === 'string' ? responseObj : responseObj.text;
        const suggestions = responseObj.suggestions || [];
        const navigation = responseObj.navigation || null;
        
        // Add to conversation history
        this.conversationHistory.push({ 
            role: 'agent', 
            message: responseText,
            timestamp: new Date().toISOString()
        });
        
        // Save chat history
        this.saveChatHistory();
        
        // Update conversation count
        this.conversationCount++;
        
        return {
            text: responseText,
            suggestions: suggestions,
            navigation: navigation,
            sentiment: this.userSentiment
        };
    }
    
    // Voice input
    startListening(callback) {
        if (!this.recognition) {
            callback({ error: 'Speech recognition not supported in this browser' });
            return;
        }
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            callback({ transcript: transcript });
        };
        
        this.recognition.onerror = (event) => {
            callback({ error: event.error });
        };
        
        this.recognition.start();
    }
    
    // Voice output
    speak(text) {
        if (!this.synth || !this.voiceEnabled) return;
        
        // Cancel any ongoing speech
        this.synth.cancel();
        
        // Remove markdown and special characters for speaking
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/[📍📞📧💰🌐📱🔄💼☁️👨‍💻🚀🧠🎓💻✅🤖🌟😊👋🇿🇦❤️💡🌍]/g, '')
            .replace(/\n/g, '. ')
            .replace(/• /g, '')
            .substring(0, 300); // Limit length for speech
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        this.synth.speak(utterance);
    }
    
    // Toggle voice
    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        return this.voiceEnabled;
    }
    
    // Clear history
    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('juba_chat_history');
    }
    
    // Get chat history
    getHistory() {
        return this.conversationHistory;
    }
}

// Initialize AI Agent UI with Enhanced Features
document.addEventListener('DOMContentLoaded', function() {
    const agent = new JubaAIAgent();
    let currentSuggestions = [];
    let isListening = false;
    
    // Create enhanced chat UI elements
    const chatHTML = `
        <div id="ai-agent-container" class="ai-agent-container">
            <button id="ai-agent-button" class="ai-agent-button" aria-label="Chat with AI Assistant">
                <i class="fas fa-robot"></i>
            </button>
            
            <div id="ai-chat-window" class="ai-chat-window">
                <div class="ai-chat-header">
                    <div class="ai-chat-header-content">
                        <div class="ai-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="ai-chat-title">
                            <h4>JUBA AI Assistant</h4>
                            <span class="ai-status">Online • Voice Enabled</span>
                        </div>
                    </div>
                    <div class="ai-header-actions">
                        <button id="ai-voice-toggle" class="ai-header-btn" title="Toggle Voice Output">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button id="ai-history-btn" class="ai-header-btn" title="Chat History">
                            <i class="fas fa-history"></i>
                        </button>
                        <button id="ai-chat-close" class="ai-chat-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div id="ai-chat-messages" class="ai-chat-messages">
                    <div class="ai-message agent-message visible">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>Hi there! 👋 I'm your JUBA CONSULTANTS virtual assistant. I can help you learn about our skills development, AI solutions, and ICT services. 
                            <br><br>💡 <strong>New:</strong> Click the microphone to talk to me, or I can read responses aloud!</p>
                        </div>
                    </div>
                </div>
                
                <div id="ai-suggestions-container" class="ai-suggestions-container" style="display: none;">
                    <div class="suggestions-title">Suggested questions:</div>
                    <div id="ai-suggestions" class="ai-suggestions"></div>
                </div>
                
                <div id="ai-autocomplete" class="ai-autocomplete" style="display: none;"></div>
                
                <div class="ai-quick-actions">
                    <button class="quick-action-btn" data-message="Tell me about your training programs">
                        <i class="fas fa-graduation-cap"></i> Training
                    </button>
                    <button class="quick-action-btn" data-message="What AI services do you offer?">
                        <i class="fas fa-brain"></i> AI Services
                    </button>
                    <button class="quick-action-btn" data-message="Tell me about ICT solutions">
                        <i class="fas fa-laptop-code"></i> ICT
                    </button>
                    <button class="quick-action-btn" data-message="How do I contact you?">
                        <i class="fas fa-envelope"></i> Contact
                    </button>
                </div>
                
                <div class="ai-chat-input-container">
                    <button id="ai-voice-input" class="ai-voice-input" title="Voice Input">
                        <i class="fas fa-microphone"></i>
                    </button>
                    <input type="text" id="ai-chat-input" class="ai-chat-input" placeholder="Ask me anything..." autocomplete="off">
                    <button id="ai-chat-send" class="ai-chat-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add chat UI to page
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    
    // Get UI elements  
    const agentButton = document.getElementById('ai-agent-button');
    const chatWindow = document.getElementById('ai-chat-window');
    const chatClose = document.getElementById('ai-chat-close');
    const chatMessages = document.getElementById('ai-chat-messages');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSend = document.getElementById('ai-chat-send');
    const voiceInput = document.getElementById('ai-voice-input');
    const voiceToggle = document.getElementById('ai-voice-toggle');
    const historyBtn = document.getElementById('ai-history-btn');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    const suggestionsContainer = document.getElementById('ai-suggestions-container');
    const suggestionsDiv = document.getElementById('ai-suggestions');
    const autocompleteDiv = document.getElementById('ai-autocomplete');
    
    // Toggle chat window
    agentButton.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });
    
    chatClose.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });
    
    // Voice Input
    voiceInput.addEventListener('click', function() {
        if (isListening) return;
        
        isListening = true;
        voiceInput.classList.add('listening');
        voiceInput.innerHTML = '<i class="fas fa-circle"></i>';
        
        agent.startListening((result) => {
            isListening = false;
            voiceInput.classList.remove('listening');
            voiceInput.innerHTML = '<i class="fas fa-microphone"></i>';
            
            if (result.error) {
                addMessage('Sorry, I couldn\'t hear that. Please try again or type your message.', false);
            } else {
                chatInput.value = result.transcript;
                sendMessage();
            }
        });
    });
    
    // Voice Output Toggle
    voiceToggle.addEventListener('click', function() {
        const enabled = agent.toggleVoice();
        if (enabled) {
            voiceToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            voiceToggle.title = 'Voice Enabled';
        } else {
            voiceToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            voiceToggle.title = 'Voice Disabled';
        }
    });
    
    // Chat History
    historyBtn.addEventListener('click', function() {
        const history = agent.getHistory();
        if (history.length === 0) {
            addMessage('No chat history yet. Start a conversation!', false);
            return;
        }
        
        const historyText = `📜 **Chat History** (Last ${Math.min(history.length, 10)} messages):\n\n` +
            history.slice(-10).map((msg, i) => 
                `${msg.role === 'user' ? '👤' : '🤖'} ${msg.message.substring(0, 50)}...`
            ).join('\n');
        
        addMessage(historyText, false);
    });
    
    // Autocomplete on input
    chatInput.addEventListener('input', function() {
        const value = this.value;
        if (value.length < 2) {
            autocompleteDiv.style.display = 'none';
            return;
        }
        
        const suggestions = agent.getAutocompleteSuggestions(value);
        if (suggestions.length === 0) {
            autocompleteDiv.style.display = 'none';
            return;
        }
        
        autocompleteDiv.innerHTML = suggestions
            .map(s => `<div class="autocomplete-item">${s}</div>`)
            .join('');
        autocompleteDiv.style.display = 'block';
        
        // Click handler for autocomplete items
        document.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', function() {
                chatInput.value = this.textContent;
                autocompleteDiv.style.display = 'none';
                sendMessage();
            });
        });
    });
    
    // Hide autocomplete when clicking outside
    document.addEventListener('click', function(e) {
        if (!chatInput.contains(e.target)) {
            autocompleteDiv.style.display = 'none';
        }
    });
    
    // Function to add message to chat
    function addMessage(message, isUser = false, suggestions = [], navigation = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${isUser ? 'user-message' : 'agent-message'}`;
        
        // Format message with markdown-like formatting
        const formattedMessage = formatMessage(message);
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${formattedMessage}</p>
                </div>
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
            `;
        } else {
            let navButton = '';
            if (navigation) {
                navButton = `<a href="${navigation.url}" class="nav-button" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Visit ${navigation.title}
                </a>`;
            }
            
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${formattedMessage}</p>
                    ${navButton}
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate message in
        setTimeout(() => messageDiv.classList.add('visible'), 10);
        
        // Show suggestions if available
        if (!isUser && suggestions && suggestions.length > 0) {
            currentSuggestions = suggestions;
            showSuggestions(suggestions);
        }
        
        // Speak response if voice enabled and not user message
        if (!isUser && agent.voiceEnabled) {
            agent.speak(message);
        }
    }
    
    // Show suggestion buttons
    function showSuggestions(suggestions) {
        suggestionsDiv.innerHTML = suggestions
            .map(s => `<button class="suggestion-btn">${s}</button>`)
            .join('');
        suggestionsContainer.style.display = 'block';
        
        // Add click handlers
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                chatInput.value = this.textContent;
                sendMessage();
                suggestionsContainer.style.display = 'none';
            });
        });
    }
    
    // Format message with basic markdown
    function formatMessage(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\n/g, '<br>')  // Line breaks
            .replace(/• /g, '<br>• ')  // Bullet points
            .replace(/(\d+\.)/g, '<br>$1')  // Numbered lists  
            .replace(/(\d+️⃣)/g, '<br><br>$1')  // Emoji numbers
            .replace(/([✅🎓🤖💻🧠💡❤️🌍📍📞📧💰🌐📱🔄💼☁️👨‍💻🚀💻🇿🇦🌟😊👋🔬📊💾⭐🔖📤🖼️🎯📅🏆📸📢🎉🎁📜])/g, '$1'); // Keep emojis
    }
    
    // Send message function (Enhanced)
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, true);
        chatInput.value = '';
        autocompleteDiv.style.display = 'none';
        suggestionsContainer.style.display = 'none';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-message agent-message typing-indicator';
        typingIndicator.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate processing time
        setTimeout(() => {
            typingIndicator.remove();
            
            // Get response from agent
            const responseObj = agent.chat(message);
            addMessage(
                responseObj.text, 
                false, 
                responseObj.suggestions || [], 
                responseObj.navigation || null
            );
        }, 600 + Math.random() * 400); // Random delay 600-1000ms
    }
    
    // Event listeners
    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick action buttons
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            chatInput.value = message;
            sendMessage();
        });
    });
    
    // Load previous chat history if exists
    const history = agent.getHistory();
    if (history.length > 1) {
        // Show last few messages
        history.slice(-5).forEach(msg => {
            if (msg.role !== 'system') {
                addMessage(msg.message, msg.role === 'user');
            }
        });
    }
});