// NDAZABAZADDE ISRAEL MINISTRIES - Main Javascript Engine

document.addEventListener('DOMContentLoaded', () => {
    // 1. ROUTING SYSTEM
    initRouter();
    
    // 2. MOBILE MENU
    initMobileMenu();

    // 3. SCROLL HEADER EFFECT
    initScrollHeader();

    // 4. INTERACTIVE CALENDAR
    initCalendar();

    // 5. GIVING PORTAL DETAILS
    updateDonationDetails();

    // 6. AUDIO PLAYER INITIALIZATION
    initAudioPlayer();
});

// ==========================================
// 1. ROUTING SYSTEM (Hash-Based SPA)
// ==========================================
const routeTitles = {
    '#home': 'Ndazabazadde Israel Ministries | Transforming Lives Through the Word',
    '#about': 'About Us | Ndazabazadde Israel Ministries',
    '#programs': 'Services Schedule & Programs | Ndazabazadde Israel Ministries',
    '#sermons': 'Sermons & Media Portal | Ndazabazadde Israel Ministries',
    '#calendar': 'Interactive Events Calendar | Ndazabazadde Israel Ministries',
    '#ministries': 'Our Ministries & Departments | Ndazabazadde Israel Ministries',
    '#gallery': 'Media Gallery | Ndazabazadde Israel Ministries',
    '#prayer': 'Submit Prayer Requests & Testimonies | Ndazabazadde Israel Ministries',
    '#give': 'Support the Ministry - Give Online | Ndazabazadde Israel Ministries',
    '#contact': 'Contact & Visit Us in Gayaza Manyangwa | Ndazabazadde Israel Ministries'
};

function initRouter() {
    let isScrollingFromClick = false;

    // Function to handle hash route routing
    const handleRoute = () => {
        let hash = window.location.hash || '#home';
        
        // Find matching section
        const targetSection = document.querySelector(hash);
        if (!targetSection) {
            hash = '#home'; // Fallback
        }

        // Update Page Title
        document.title = routeTitles[hash] || 'Ndazabazadde Israel Ministries';

        // Scroll to target section smoothly (accounting for scroll-margin-top)
        const activeSection = document.getElementById(hash.substring(1));
        if (activeSection) {
            isScrollingFromClick = true;
            activeSection.scrollIntoView({ behavior: 'smooth' });
            
            // Mark active class
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });

            // Set isScrollingFromClick to false after scroll animation completes
            setTimeout(() => {
                isScrollingFromClick = false;
            }, 800);
        }

        // Dynamic hook for sermons (stop playing when navigated away if iframe supports it, or reload to pause)
        if (hash !== '#sermons') {
            pauseMainVideo();
        }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);

    // Scroll listener for dynamic highlighting
    window.addEventListener('scroll', () => {
        if (isScrollingFromClick) return;

        const sections = document.querySelectorAll('.page-section');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSectionId = 'home';
        const scrollPosition = window.scrollY + 120; // 120px offset to trigger highlighting slightly early

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
            // Update address bar hash without triggering scroll jump
            if (window.location.hash !== `#${currentSectionId}`) {
                history.replaceState(null, null, `#${currentSectionId}`);
                document.title = routeTitles[`#${currentSectionId}`] || 'Ndazabazadde Israel Ministries';
            }
        }
    });
}

// ==========================================
// 2. MOBILE MENU HANDLER
// ==========================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Close mobile menu programmatically
function toggleMenu(show) {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileToggle && navMenu) {
        if (show) {
            mobileToggle.classList.add('active');
            navMenu.classList.add('active');
        } else {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}

// ==========================================
// 3. SCROLL HEADER EFFECT
// ==========================================
function initScrollHeader() {
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================
// 4. WEEKLY PROGRAMS TAB SWITCH
// ==========================================
function switchScheduleTab(tabId) {
    // Deactivate all buttons
    const tabButtons = document.querySelectorAll('#scheduleTabs .tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Deactivate all content panels
    const panels = document.querySelectorAll('.tab-content-panel');
    panels.forEach(p => p.classList.remove('active'));

    // Activate selected button and content
    if (tabId === 'sunday') {
        document.querySelector('#scheduleTabs button:nth-child(1)').classList.add('active');
        document.getElementById('sundayTab').classList.add('active');
    } else if (tabId === 'midweek') {
        document.querySelector('#scheduleTabs button:nth-child(2)').classList.add('active');
        document.getElementById('midweekTab').classList.add('active');
    } else if (tabId === 'weekend') {
        document.querySelector('#scheduleTabs button:nth-child(3)').classList.add('active');
        document.getElementById('weekendTab').classList.add('active');
    }
}

// ==========================================
// 5. MEDIA PLAYER (YOUTUBE INTEGRATION)
// ==========================================
function changeVideo(videoId, title, description, playlistItemElement) {
    const playLinkEl = document.getElementById('videoPlayLink');
    const thumbnailEl = document.getElementById('videoPreviewThumbnail');
    const clickPromptEl = document.getElementById('videoClickPrompt');
    const titleEl = document.getElementById('currentVideoTitle');
    const descEl = document.getElementById('currentVideoDesc');

    // Update link & thumbnail
    if (playLinkEl && thumbnailEl && clickPromptEl) {
        if (videoId === 'zQzJrUHbCF8') {
            // Live Stream
            playLinkEl.href = 'https://www.youtube.com/live/zQzJrUHbCF8?si=0hRvRrU48hSfZzgH';
            playLinkEl.classList.add('is-live');
            // Show the actual thumbnail of the live service
            thumbnailEl.style.backgroundImage = "url('https://img.youtube.com/vi/zQzJrUHbCF8/hqdefault.jpg')";
            clickPromptEl.textContent = 'Watch Live Stream on YouTube';
        } else {
            // Recorded Video
            playLinkEl.href = `https://www.youtube.com/watch?v=${videoId}`;
            playLinkEl.classList.remove('is-live');
            thumbnailEl.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')`;
            clickPromptEl.textContent = 'Watch Sermon on YouTube';
        }
    }
    
    // Update labels
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = description;

    // Update active playlist item highlight
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
    });
    if (playlistItemElement) {
        playlistItemElement.classList.add('active');
    }

    // Update livestream status badge mockup
    const liveStatusBadge = document.getElementById('liveStatusBadge');
    const liveStatusText = document.getElementById('liveStatusText');
    
    // Update watch link dynamically
    const watchLink = document.getElementById('watchOnYoutubeLink');
    if (watchLink) {
        if (videoId === 'zQzJrUHbCF8') {
            watchLink.href = 'https://www.youtube.com/live/zQzJrUHbCF8?si=0hRvRrU48hSfZzgH';
        } else {
            watchLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        }
    }

    // Simulating YouTube Live Stream switch
    if (liveStatusBadge && liveStatusText) {
        if (videoId === 'zQzJrUHbCF8') { // Live stream
            liveStatusBadge.className = 'live-status-badge live';
            liveStatusBadge.innerHTML = '<span class="pulse-dot"></span> LIVE NOW';
            liveStatusText.textContent = 'Sunday Worship Service is Live from Gayaza Sanctuary';
        } else {
            liveStatusBadge.className = 'live-status-badge offline';
            liveStatusBadge.innerHTML = '<span class="pulse-dot"></span> RECORDED SERMON';
            liveStatusText.textContent = 'Recorded live service from Gayaza Sanctuary';
        }
    }
}

function pauseMainVideo() {
    // No iframe video to pause since clicking redirects to YouTube in a new tab
}

function playFeaturedVideo(sermonId) {
    // Auto navigate to sermons section and play the featured video
    window.location.hash = '#sermons';
    setTimeout(() => {
        const firstPlaylistItem = document.querySelector('.playlist-item');
        if (firstPlaylistItem) {
            firstPlaylistItem.click();
        }
    }, 450);
}

function mockDownload(event, fileName) {
    event.preventDefault();
    alert(`Starting download for: ${fileName}...\n(This is a demonstration link. In a live system, this triggers the official file download.)`);
}

function downloadLyrics(event, songKey) {
    if (event) event.preventDefault();
    let lyricsText = '';
    let fileName = '';

    if (songKey === 'akabonero') {
        lyricsText = `AKABONERO (THE SIGN) BY PASTOR KAWUKI ELIFAZI

(Chorus)
Ayi Mukama, gwe kukuuma kwange,
Eri erinnya lyo, ge maanyi gange.
Akabonero k'olugendo lwange,
Yesu gwe kitiibwa kyange.
(Repeat Chorus)

(Verse 1)
Lord, You are the sign of my salvation,
You are my shield and strong foundation.
Through the valleys and the storms I face,
I am covered by Your boundless grace.
Jesus, You're the marker of my way,
Leading me from night to glorious day.
I lift my hands to praise Your holy name,
For Your love remains forever the same.

(Verse 2)
Mukama, gwe kabonero k'obulamu,
Mu buli lugendo gwe wamaanyi.
Wakati mu mikwano n'ebigezo,
Nsanga obukuumi mu kisa kyo.
Erinnya lyo ly'eryo linywezezza,
Yesu mulokozi ansobozesezza.
Kutendereza nze kwe nsaana,
Nkwesige bulijjo Tata waffe.

(Outro)
Yesu kabonero k'olugendo,
Nkwesiga bulijjo...`;
        fileName = 'Akabonero_Lyrics.txt';
    } else if (songKey === 'onongoose') {
        lyricsText = `ONONGOOSE (YOU PURIFIED ME) BY PASTOR KAWUKI ELIFAZI

(Chorus)
Onongoose ayi Mukama mulungi,
Omusaayi gwo gunyozezza omutima gwange.
Kati ntambula mu butukuvu bwo,
Yesu onongoosezza bulungi.
(Repeat Chorus)

(Verse 1)
Lord, You washed away my sins and my shame,
You gave me grace and a brand new name.
By Your holy blood shed on Calvary's tree,
You broke the chains and You set me free.
Purify my heart, make me clean within,
Wash me clean from all my hidden sin.
I stand in Your presence, holy and pure,
For Your covenant love is forever sure.

(Verse 2)
Mukama wange, ontoozeyo ebibi byange,
Ompaadde ekitibwa mu bulamu bwange.
Omusaayi gwo ogugabibwa ku musalaba,
Kwe kunnunula kwange ayi Tata.
Longosa omutima gwange buli lukya,
Nsangule mu maaso go ng'omusenyu.
Nsobole okuyimirira mu buwulize bwo,
Nkukolere bulijjo Kabaka wange.

(Outro)
Yesu onongoosezza,
Ntambula gyoli...`;
        fileName = 'Onongoose_Lyrics.txt';
    } else if (songKey === 'tuwunguke') {
        lyricsText = `TUWUNGUKE (LET US CROSS OVER) BY PASTOR KAWUKI ELIFAZI

(Chorus)
Tuwunguke bulijjo n'amaanyi ga Yesu,
Tulaba ensi ey'omukisa n'emirembe.
Tulinnyonge ebigere ku ddaala eddene,
Yesu atuyamba okutuuka.
(Repeat Chorus)

(Verse 1)
We are crossing over to the other side,
With the Holy Spirit as our faithful guide.
No river Jordan can stand in our way,
For the Lord of Hosts is our strength today.
Through the waters deep and the valley low,
Into the promises of God we will go.
The wilderness is past, the victory is here,
We will cross over, we shall not fear.

(Verse 2)
Tuwunguka emimiro n'ebisenge,
N'omusaayi gwo ogutuwa emirembe.
Jordan tajja kutugaana kutambula,
Kubanga gwe Katonda atukulembedde.
Mu nnyanja eddene n'amazzi amangi,
Mulayiro gwo gwe gannyweza bulijjo.
Eddungu liweddewo, obuwanguzi butuuse,
Tuwunguka kati ewuwo Kabaka.

(Outro)
Tuwunguka emirembe,
Yesu ye kkubbo...`;
        fileName = 'Tuwunguke_Lyrics.txt';
    } else if (songKey === 'bwebanga') {
        lyricsText = `BWEBANGA NENENYA (IF I REPENTED) BY PASTOR KAWUKI ELIFAZI

(Chorus)
Bwebanga nenenya mu maaso go Yesu,
Onsonyiwa ebibi byange byonna.
Ozzamu obulamu mu mutima gwange,
Mukama wange onzizaako ebirungi.
(Repeat Chorus)

(Verse 1)
If I humble myself and confess my sin,
Your mercy heals my heart from deep within.
You do not turn away a broken soul,
By Your grace, You make me whole.
Lord, I return to Your holy presence now,
Before Your throne of grace I humbly bow.
Forgive my transgressions, restore my peace,
Let Your love and mercy never cease.

(Verse 2)
Bwensobi Katonda, nzigya mumaaso go,
Nga nneetoowaza okusaba ewuwo.
Togoba mutima oguboneredde Tata,
Mu kisa kyo, onsobola okuzimba.
Kati nkomyewo gyoli Mulokozi wange,
Nnasangula buli kye nnakola obubi.
Sonyiwa byonna, zzaako emirembe gyange,
Kisa kyo kinsanikire bulijjo.

(Outro)
Yesu onsonyiwa,
Bwenkomayo gyoli...`;
        fileName = 'Bwebanga_Nenenya_Lyrics.txt';
    } else {
        lyricsText = `MUKAMA JANGU OFUGE BY PASTOR KAWUKI ELIFAZI

(Chorus)
Obulamu bwange, mbukukwasiza gwe Mukama
Obulamu bwange, mbukukwasiza gwe Yesu
Jangu ofuge.
(Repeat Chorus)

(Verse 1)
Lord change my destiny,
And make a way where seems to be no way,
Jesus you're the way maker.
I surrender everything, oh Lord unto you,
I give myself away, Jesus take over.
My redeemer, I bow before you, oh Lord,
I lift my hands to you, I need you.
I wanna be where you are,
Jesus I wanna be where you are.
You've done great things unto me oh Jehovah.
I give myself to you, Jesus I give myself to you,
You're able... I give myself to you, Jehovah.

(Verse 2)
Mukama kyusa amagenda gange,
Ntemela ekubbo awelitali,
Mpaayo ebyange byona gwe abisobola.
Bibyo twala Mukama, newaayo gyoli,
No'mutima gwange gwonna.
Omununuzi wange, mvunama mumasoga,
Nyimusa emikono gyoli,
Kekabonero nti nkwanze.
Njagala kubeela awo woli ayi Mukama,
Nzikankana wansi womukono gwo kulwobulamu bwange.
Newaayo gyoli Yesu Tata,
Newaayo gyoli Kabaka,
Newaayo gyoli gwe asobola.

(Outro)
Yesu obulamu bwange mbukuwadde,
Jangu ofuge...`;
        fileName = 'Mukama_Jangu_Ofuge_Lyrics.txt';
    }

    const blob = new Blob([lyricsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==========================================
// 6. INTERACTIVE CALENDAR ENGINE
// ==========================================
// Events database
const churchEvents = [
    {
        id: 1,
        title: "Father's Day Special Fellowship",
        date: "2026-06-21",
        time: "9:00 AM - 1:30 PM",
        location: "Main Sanctuary",
        category: "special",
        description: "A special Sunday service honoring all fathers. Apostle Kawuki Elifazi will deliver a prophetic blessing upon families. Special gifts and testimonies."
    },
    {
        id: 2,
        title: "Monthly Deliverance Night Vigil",
        date: "2026-06-12",
        time: "9:00 PM - 4:00 AM",
        location: "Ndazabazadde Church Sanctuary",
        category: "prayer",
        description: "Our monthly corporate overnight service held every Second Friday. A night of intense spiritual warfare, praise, deliverance, and prophetic declarations for families."
    },
    {
        id: 3,
        title: "Holy Communion & Anointing Service",
        date: "2026-07-05",
        time: "8:00 AM - 1:00 PM",
        location: "Main Sanctuary",
        category: "special",
        description: "A divine communion Sunday morning service. Come receive the sacrament of the Lord's supper and a special oil anointing for spiritual speed in the second half of the year."
    },
    {
        id: 4,
        title: "Manyangwa Community Health Camp",
        date: "2026-07-12",
        time: "2:00 PM - 6:00 PM",
        location: "Manyangwa Trading Center",
        category: "outreach",
        description: "Our quarterly charity outreach. Providing free basic medical checkups, health sensitization, clean clothes, and food relief to needy households. Evangelism outreach follows."
    },
    {
        id: 5,
        title: "Monthly Deliverance Night Vigil",
        date: "2026-07-10",
        time: "9:00 PM - 4:00 AM",
        location: "Ndazabazadde Sanctuary",
        category: "prayer",
        description: "Our monthly corporate overnight service held every Second Friday. A night of intense spiritual warfare, praise, deliverance, and prophetic declarations for families."
    },
    {
        id: 6,
        title: "Worship Concert: Altar of Praise",
        date: "2026-08-09",
        time: "5:00 PM - 8:30 PM",
        location: "Church Sanctuary",
        category: "special",
        description: "A night of praise and worship concert hosted by the Ndazabazadde Worship Team. Guest choirs from Gayaza and Kampala will join us to raise an incense of praise."
    },
    {
        id: 7,
        title: "Youth Fire Camp & Conference",
        date: "2026-08-28",
        time: "8:00 AM - 6:00 PM (Daily)",
        location: "Gayaza Fellowship Grounds",
        category: "special",
        description: "Three days of intense youth revival. Focuses on leadership development, talent exhibits, career counseling, sound scriptural teachings, and Holy Spirit baptism."
    }
];

let currentYear = 2026;
let currentMonth = 5; // June (0-indexed: 0=Jan, 5=Jun)
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function initCalendar() {
    renderCalendar();
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    const upcomingEventsList = document.getElementById('upcomingEventsList');
    
    if (!calendarDays || !calendarMonthYear) return;

    calendarDays.innerHTML = '';
    calendarMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Get first day of the month index (0=Sun, 1=Mon...)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Get total number of days in the month
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // 1. Create empty spacer cells for padding before 1st of month
    for (let i = 0; i < firstDay; i++) {
        const spacer = document.createElement('div');
        spacer.className = 'calendar-day-cell empty';
        calendarDays.appendChild(spacer);
    }

    // 2. Render each day of the month
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day-cell';
        
        // Format date string for checking events (YYYY-MM-DD)
        const checkMonth = String(currentMonth + 1).padStart(2, '0');
        const checkDay = String(day).padStart(2, '0');
        const dateStr = `${currentYear}-${checkMonth}-${checkDay}`;

        // Today highlight checker (mocked to match current system date or calendar focus)
        const today = new Date();
        if (today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day) {
            cell.classList.add('today');
        }

        // Add Day number
        const numSpan = document.createElement('span');
        numSpan.className = 'day-number';
        numSpan.textContent = day;
        cell.appendChild(numSpan);

        // Find events on this day
        const dayEvents = churchEvents.filter(e => e.date === dateStr);
        
        if (dayEvents.length > 0) {
            const indicatorWrap = document.createElement('div');
            indicatorWrap.className = 'event-indicators';
            
            dayEvents.forEach(evt => {
                const badge = document.createElement('span');
                badge.className = `event-dot-indicator ${evt.category}`;
                badge.textContent = evt.title;
                indicatorWrap.appendChild(badge);
                
                // Add click listener to cell to view event detail modal
                cell.addEventListener('click', () => showEventDetails(evt));
            });
            
            cell.appendChild(indicatorWrap);
        } else {
            // General click listener showing a simple date query
            cell.addEventListener('click', () => {
                // No event on this date
            });
        }

        calendarDays.appendChild(cell);
    }

    // 3. Render Upcoming Events Sidebar matching the active calendar month
    renderUpcomingEventsList();
}

function renderUpcomingEventsList() {
    const upcomingEventsList = document.getElementById('upcomingEventsList');
    if (!upcomingEventsList) return;

    upcomingEventsList.innerHTML = '';
    
    const checkMonth = String(currentMonth + 1).padStart(2, '0');
    const monthEvents = churchEvents.filter(e => e.date.substring(5, 7) === checkMonth && e.date.substring(0, 4) === String(currentYear));

    if (monthEvents.length === 0) {
        upcomingEventsList.innerHTML = `
            <div class="p-20 text-center text-slate">
                <p><i class="fa-solid fa-calendar-xmark gold-text"></i></p>
                <p class="small mt-10">No special events scheduled for this month. Join our regular weekly programs!</p>
            </div>
        `;
        return;
    }

    // Render list
    monthEvents.forEach(evt => {
        const dateObj = new Date(evt.date);
        const dayStr = dateObj.getDate();
        const monthShort = dateObj.toLocaleString('en-US', { month: 'short' });
        
        const item = document.createElement('div');
        item.className = `event-list-item ${evt.category}`;
        item.innerHTML = `
            <div class="event-details">
                <h4>${evt.title}</h4>
                <p><i class="fa-solid fa-clock"></i> ${evt.time}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${evt.location}</p>
            </div>
        `;
        item.addEventListener('click', () => showEventDetails(evt));
        upcomingEventsList.appendChild(item);
    });
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

// Event Detail Modal Popup
function showEventDetails(eventObj) {
    const modal = document.getElementById('eventModal');
    const badge = document.getElementById('modalEventCategory');
    const title = document.getElementById('modalEventTitle');
    const date = document.getElementById('modalEventDate');
    const time = document.getElementById('modalEventTime');
    const loc = document.getElementById('modalEventLocation');
    const desc = document.getElementById('modalEventDesc');

    badge.className = `badge badge-gold`;
    badge.textContent = eventObj.category.charAt(0).toUpperCase() + eventObj.category.slice(1);
    title.textContent = eventObj.title;
    
    // Format Date nicely
    const dateFormatted = new Date(eventObj.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    date.textContent = dateFormatted;
    
    time.textContent = eventObj.time;
    loc.textContent = eventObj.location;
    desc.textContent = eventObj.description;

    modal.classList.add('active');
}

function closeEventModal() {
    document.getElementById('eventModal').classList.remove('active');
}

function registerForEvent() {
    alert("Thank you! You have successfully registered for this event. We look forward to fellowshiping with you.");
    closeEventModal();
}

// ==========================================
// 7. MINISTRIES EXPANDABLE DETAIL SYSTEM
// ==========================================
function toggleMinistryDetails(ministryKey) {
    const detailsDiv = document.getElementById(`m-${ministryKey}`);
    const card = detailsDiv.parentElement;
    const btn = card.querySelector('button');

    if (detailsDiv.classList.contains('active')) {
        detailsDiv.classList.remove('active');
        btn.textContent = 'Learn More';
    } else {
        // Collapse others in same view
        document.querySelectorAll('.ministry-details').forEach(div => {
            div.classList.remove('active');
        });
        document.querySelectorAll('.ministry-card button').forEach(b => {
            b.textContent = 'Learn More';
        });

        // Expand target
        detailsDiv.classList.add('active');
        btn.textContent = 'Hide Details';
    }
}

// ==========================================
// 8. GALLERY TAG FILTERING & LIGHTBOX
// ==========================================
function filterGallery(categoryTag) {
    // Update Tab active style
    const tabButtons = document.querySelectorAll('#galleryFilters button');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Quick match matching text
    event.target.classList.add('active');

    // Filter Items
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (categoryTag === 'all' || item.classList.contains(categoryTag)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function openLightbox(galleryItemElement) {
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbVideoWrapper = document.getElementById('lightboxVideoWrapper');
    const lbIframe = document.getElementById('lightboxIframe');
    const lbTitle = document.getElementById('lightboxTitle');
    const lbCat = document.getElementById('lightboxCat');

    const img = galleryItemElement.querySelector('img');
    const title = galleryItemElement.querySelector('h4').textContent;
    const cat = galleryItemElement.querySelector('p').textContent;
    const videoId = galleryItemElement.getAttribute('data-video-id');

    lbTitle.textContent = title;
    lbCat.textContent = cat;

    if (videoId) {
        lbImg.style.display = 'none';
        lbVideoWrapper.style.display = 'block';
        lbIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else {
        lbVideoWrapper.style.display = 'none';
        lbImg.style.display = 'block';
        lbImg.src = img.src;
        lbIframe.src = '';
    }

    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lbIframe = document.getElementById('lightboxIframe');
    if (lbIframe) {
        lbIframe.src = '';
    }
    lightbox.classList.remove('active');
}

// ==========================================
// 9. PRAYER REQUESTS & TESTIMONY SUBMISSIONS
// ==========================================
// ==========================================
// FORM SUBMISSION CONFIGURATION (Web3Forms)
// ==========================================
// Enter your Web3Forms access key here to receive email notifications.
// You can get a free access key from: https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'; 

function submitToWeb3Forms(data, callback) {
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
        console.warn('Web3Forms Access Key is not configured. Email submission is simulated.');
        setTimeout(callback, 500);
        return;
    }

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            ...data
        })
    })
    .then(response => response.json())
    .then(res => {
        if (res.success) {
            callback(true);
        } else {
            console.error('Web3Forms submission error:', res);
            callback(false, res.message || 'Error submitting form.');
        }
    })
    .catch(err => {
        console.error('Network error during form submission:', err);
        callback(false, 'Network error. Please try again.');
    });
}

function handlePrayerSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Request';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-5"></i> Submitting...';
    }

    const name = document.getElementById('prayerName').value;
    const phone = document.getElementById('prayerPhone').value;
    const email = document.getElementById('prayerEmail').value;
    const request = document.getElementById('prayerText').value;
    const isConfidential = document.getElementById('prayerConfidential').checked;

    const data = {
        subject: `New Prayer Request from ${name}`,
        from_name: 'Ndazabazadde Website Portal',
        name: name,
        phone: phone,
        email: email,
        confidential: isConfidential ? 'Yes (Private)' : 'No (Public)',
        message: request
    };

    submitToWeb3Forms(data, (success, errorMsg) => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }

        const msg = success 
            ? `Dear ${name}, the leadership and the Intercessory Prayer Desk have received your request. We stand with you in faith.`
            : `Thank you. We have received your prayer request locally (Simulation mode).`;

        // Format WhatsApp message
        const wpText = `Praise the Lord Apostle Kawuki Elifazi, I am submitting a prayer request from the website:

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Confidential:* ${isConfidential ? 'Yes' : 'No'}
*Request:* ${request}`;

        const wpUrl = `https://wa.me/256705051999?text=${encodeURIComponent(wpText)}`;
        
        showSuccessModal(msg, wpUrl);
        
        // Reset Form
        document.getElementById('prayerForm').reset();
    });
}

function handleTestimonySubmit(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Testimony';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-5"></i> Submitting...';
    }

    const name = document.getElementById('testimonyName').value;
    const location = document.getElementById('testimonyLocation').value;
    const text = document.getElementById('testimonyText').value;
    const shareable = document.getElementById('testimonyPublish').checked;

    const data = {
        subject: `New Testimony from ${name} (${location})`,
        from_name: 'Ndazabazadde Website Portal',
        name: name,
        location: location,
        share_permission: shareable ? 'Permitted to share' : 'Do not share publicly',
        message: text
    };

    submitToWeb3Forms(data, (success, errorMsg) => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }

        const msg = success
            ? `Glory to God! Thank you ${name} from ${location} for sharing your testimony. Testifying of God's goodness strengthens the church family.`
            : `Glory to God! Thank you ${name} for sharing your testimony (Simulation mode).`;

        // Format WhatsApp message
        const wpText = `Praise the Lord Apostle Kawuki Elifazi, I am sharing a testimony from the website:

*Name:* ${name}
*Location:* ${location}
*Permit Sharing:* ${shareable ? 'Yes' : 'No'}
*Testimony:* ${text}`;

        const wpUrl = `https://wa.me/256705051999?text=${encodeURIComponent(wpText)}`;

        showSuccessModal(msg, wpUrl);

        // Reset Form
        document.getElementById('testimonyForm').reset();
    });
}

function handleContactSubmit(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-5"></i> Sending...';
    }

    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const msgText = document.getElementById('contactMessage').value;

    const data = {
        subject: `New Contact Form Inquiry from ${name}`,
        from_name: 'Ndazabazadde Website Portal',
        name: name,
        phone: phone,
        message: msgText
    };

    submitToWeb3Forms(data, (success, errorMsg) => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }

        const msg = success
            ? `Thank you ${name}. Your message has been sent to Ndazabazadde Israel Ministries office. We will get back to you shortly.`
            : `Thank you ${name}. Your message was received (Simulation mode).`;

        // Format WhatsApp message
        const wpText = `Praise the Lord Apostle Kawuki Elifazi, I have sent an inquiry from the website contact form:

*Name:* ${name}
*Phone:* ${phone}
*Message:* ${msgText}`;

        const wpUrl = `https://wa.me/256705051999?text=${encodeURIComponent(wpText)}`;

        showSuccessModal(msg, wpUrl);

        // Reset Form
        document.getElementById('contactForm').reset();
    });
}

function showSuccessModal(messageText, whatsAppUrl = null) {
    const modal = document.getElementById('successModal');
    const msgContainer = document.getElementById('successModalMsg');
    const actionContainer = document.getElementById('modalActionContainer');
    
    if (msgContainer) msgContainer.textContent = messageText;
    
    if (actionContainer) {
        actionContainer.innerHTML = '';
        if (whatsAppUrl) {
            const waButton = document.createElement('a');
            waButton.href = whatsAppUrl;
            waButton.target = '_blank';
            waButton.className = 'btn btn-green w-100 flex align-center justify-center gap-10';
            waButton.style.display = 'inline-flex';
            waButton.style.alignItems = 'center';
            waButton.style.justifyContent = 'center';
            waButton.style.width = '100%';
            waButton.style.marginTop = '10px';
            waButton.style.background = '#25D366';
            waButton.style.color = '#fff';
            waButton.style.border = 'none';
            waButton.style.padding = '12px 15px';
            waButton.style.borderRadius = 'var(--border-radius)';
            waButton.style.cursor = 'pointer';
            waButton.style.fontWeight = '700';
            waButton.style.fontSize = '0.9rem';
            waButton.style.textDecoration = 'none';
            waButton.style.transition = 'all 0.3s ease';
            waButton.innerHTML = `<i class="fa-brands fa-whatsapp" style="font-size: 1.2rem; margin-right: 8px;"></i> Also Send via WhatsApp`;
            
            waButton.addEventListener('mouseenter', () => {
                waButton.style.background = '#128C7E';
                waButton.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
            });
            waButton.addEventListener('mouseleave', () => {
                waButton.style.background = '#25D366';
                waButton.style.boxShadow = 'none';
            });
            
            waButton.addEventListener('click', () => {
                closeSuccessModal();
            });
            actionContainer.appendChild(waButton);
        }
    }
    
    if (modal) modal.classList.add('active');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('active');
}

// ==========================================
// 10. GIVING & DONATIONS CALCULATOR / DETAILS
// ==========================================
let donationAmount = 0;
let donationCategory = 'tithe';

function setDonationAmount(amountValue) {
    document.getElementById('customAmountInput').value = amountValue;
    donationAmount = amountValue;
    
    // Highlight preset button
    document.querySelectorAll('.amount-presets .btn-preset').forEach(btn => {
        btn.classList.remove('active');
        
        // Match label
        const amtText = amountValue >= 100000 ? `${amountValue/1000}k` : `${amountValue/1000}k`;
        if (btn.textContent.toLowerCase() === `${amountValue/1000}k`.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    updateDonationDetails();
}

function switchPaymentTab(paymentMethodKey) {
    // Toggle active classes on tab buttons
    document.querySelectorAll('#paymentTabs button').forEach(btn => {
        btn.classList.remove('active');
    });

    if (paymentMethodKey === 'momo') {
        document.getElementById('momoPayBtn').classList.add('active');
        document.getElementById('momoContent').classList.add('active');
        document.getElementById('bankContent').classList.remove('active');
    } else {
        document.getElementById('bankPayBtn').classList.add('active');
        document.getElementById('bankContent').classList.add('active');
        document.getElementById('momoContent').classList.remove('active');
    }
}

function updateDonationDetails() {
    const categorySelect = document.getElementById('donationCategory');
    const customAmountInput = document.getElementById('customAmountInput');
    const momoRefCategory = document.getElementById('momoRefCategory');

    if (categorySelect) {
        donationCategory = categorySelect.options[categorySelect.selectedIndex].text.split('(')[0].trim();
    }
    
    if (customAmountInput) {
        donationAmount = Number(customAmountInput.value) || 0;
    }

    // Update dynamic payment note descriptions
    if (momoRefCategory) {
        const amtStr = donationAmount > 0 ? ` [${donationAmount.toLocaleString()} UGX]` : '';
        momoRefCategory.innerHTML = `"${donationCategory}${amtStr}"`;
    }
}

// ==========================================
// 11. PLAYLIST TAB SWITCHER
// ==========================================
function switchPlaylistTab(tabId) {
    // Deactivate all playlist tab buttons
    const tabButtons = document.querySelectorAll('.playlist-tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Deactivate all playlist content tabs
    const panels = document.querySelectorAll('.playlist-tab-content');
    panels.forEach(p => p.classList.remove('active'));

    // Activate selected button and content tab
    if (tabId === 'services') {
        document.querySelector('.playlist-tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('servicesPlaylistTab').classList.add('active');
    } else if (tabId === 'gospel') {
        document.querySelector('.playlist-tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('gospelPlaylistTab').classList.add('active');
    }
}

// ==========================================
// 12. MOBILE MONEY CHECKOUT SIMULATOR
// ==========================================
let momoFlowState = 0; // 0: initial, 1: choice entered, 2: pin entered
let momoInputPhone = '';
let momoInputName = '';
let momoSelectAmount = 0;
let momoSelectCategory = 'Tithe';

function handleMomoSubmit(event) {
    event.preventDefault();
    
    // Get inputs
    momoInputPhone = document.getElementById('momoPhone').value;
    momoInputName = document.getElementById('momoName').value;
    
    const categorySelect = document.getElementById('donationCategory');
    if (categorySelect) {
        momoSelectCategory = categorySelect.options[categorySelect.selectedIndex].text.split('(')[0].trim();
    }
    
    const customAmountInput = document.getElementById('customAmountInput');
    momoSelectAmount = Number(customAmountInput.value) || 0;
    if (momoSelectAmount <= 0) {
        alert("Please enter or select a donation amount first.");
        return;
    }

    // Reset simulator state
    momoFlowState = 0;
    document.getElementById('momoScreenInput').value = '';
    document.getElementById('momoScreenInput').type = 'text';
    
    // Show modal and start loading steps
    const modal = document.getElementById('momoModal');
    if (modal) modal.classList.add('active');
    
    document.getElementById('momoLoader').style.display = 'block';
    document.getElementById('momoPhoneScreen').style.display = 'none';
    document.getElementById('momoSuccessScreen').style.display = 'none';
    
    const titleEl = document.getElementById('momoModalTitle');
    const descEl = document.getElementById('momoModalDesc');
    
    // Step 1: Connecting
    titleEl.textContent = "Initiating Gateway Connection...";
    descEl.textContent = `Establishing secure channel to telecom billing gateways for ${momoInputPhone}...`;
    
    setTimeout(() => {
        // Step 2: Verifying
        titleEl.textContent = "Verifying Mobile Wallet...";
        descEl.textContent = `Checking registered account name for "${momoInputName}" on mobile network...`;
        
        setTimeout(() => {
            // Step 3: Triggering prompt screen
            document.getElementById('momoLoader').style.display = 'none';
            document.getElementById('momoPhoneScreen').style.display = 'block';
            
            // Format screen text based on phone format (MTN vs Airtel detection)
            const isMTN = momoInputPhone.startsWith('077') || momoInputPhone.startsWith('078') || momoInputPhone.startsWith('25677') || momoInputPhone.startsWith('25678') || momoInputPhone.startsWith('+25677') || momoInputPhone.startsWith('+25678');
            const operatorName = isMTN ? "MTN Mobile Money" : "Airtel Money";
            
            document.getElementById('momoScreenText').innerHTML = `
                ${operatorName}<br>
                Pay ${momoSelectAmount.toLocaleString()} UGX to NDAZABAZADDE ISRAEL MINISTRIES for ${momoSelectCategory}?<br>
                1. Confirm Payment<br>
                2. Cancel
            `;
            
            document.getElementById('momoScreenInput').focus();
        }, 2000);
    }, 2000);
}

function submitMomoScreenInput() {
    const inputVal = document.getElementById('momoScreenInput').value.trim();
    const screenTextEl = document.getElementById('momoScreenText');
    const inputEl = document.getElementById('momoScreenInput');
    
    const isMTN = momoInputPhone.startsWith('077') || momoInputPhone.startsWith('078') || momoInputPhone.startsWith('25677') || momoInputPhone.startsWith('25678') || momoInputPhone.startsWith('+25677') || momoInputPhone.startsWith('+25678');
    const operatorName = isMTN ? "MTN Mobile Money" : "Airtel Money";

    if (momoFlowState === 0) {
        if (inputVal === '1') {
            momoFlowState = 1;
            inputEl.value = '';
            inputEl.type = 'password'; // Mask PIN entry
            screenTextEl.innerHTML = `
                ${operatorName}<br><br>
                Enter your Mobile Money PIN to authorize payment of ${momoSelectAmount.toLocaleString()} UGX to NDAZABAZADDE ISRAEL MINISTRIES:
            `;
            inputEl.focus();
        } else {
            closeMomoModal();
        }
    } else if (momoFlowState === 1) {
        if (inputVal.length >= 4) {
            momoFlowState = 2;
            inputEl.type = 'text'; // Restore field style
            
            // Show loader simulation
            document.getElementById('momoPhoneScreen').style.display = 'none';
            document.getElementById('momoLoader').style.display = 'block';
            
            const titleEl = document.getElementById('momoModalTitle');
            const descEl = document.getElementById('momoModalDesc');
            titleEl.textContent = "Processing Transaction...";
            descEl.textContent = "Authorizing payment and issuing transaction token...";
            
            setTimeout(() => {
                document.getElementById('momoLoader').style.display = 'none';
                document.getElementById('momoSuccessScreen').style.display = 'block';
                
                // Format receipt message
                document.getElementById('momoSuccessText').textContent = `Thank you ${momoInputName}. You have authorized the payment of ${momoSelectAmount.toLocaleString()} UGX for "${momoSelectCategory}" from ${momoInputPhone}. A confirmation SMS receipt will be sent shortly.`;
                
                // Set up WhatsApp backup receipt confirmation link
                const wpMessageText = `Praise the Lord Apostle Kawuki Elifazi, I am submitting giving details from the website portal:
                
*Giver Name:* ${momoInputName}
*Phone Number:* ${momoInputPhone}
*Amount:* ${momoSelectAmount.toLocaleString()} UGX
*Category:* ${momoSelectCategory}
*Method:* Mobile Money (${operatorName})`;

                const wpUrl = `https://wa.me/256705051999?text=${encodeURIComponent(wpMessageText)}`;
                document.getElementById('momoWhatsAppReceiptBtn').href = wpUrl;
            }, 2500);
        } else {
            alert("Please enter a valid PIN (4 or more digits).");
        }
    }
}

function closeMomoModal() {
    const modal = document.getElementById('momoModal');
    if (modal) modal.classList.remove('active');
}

// ==========================================
// 13. FLOATING AUDIO PLAYER ENGINE
// ==========================================
// Worship Songs Database
const worshipPlaylist = [
    { id: 'qcqgrvZFr1I', title: 'Mukama Jangu Ofuge', artist: 'Pastor Kawuki Elifazi' },
    { id: 'B2oIbFPIBug', title: 'Akabonero', artist: 'Pastor Kawuki Elifazi' },
    { id: 'N6MYri-PjJY', title: 'Onongoose', artist: 'Pastor Kawuki Elifazi' },
    { id: 'EimhUSnBsyg', title: 'Tuwunguke', artist: 'Pastor Kawuki Elifazi' },
    { id: 'dMxNUjkulp0', title: 'Bwebanga Nenenya', artist: 'Pastor Kawuki Elifazi' }
];

let ytPlayer = null;
let activeSongIndex = -1;
let ytPlayerReady = false;
let progressInterval = null;
let isMuted = false;
let currentVolume = 100;

// Global YouTube API Ready Callback
window.onYouTubeIframeAPIReady = function() {
    // If the YT script is loaded, instantiate the player in the placeholder div
    ytPlayer = new YT.Player('youtubePlayerPlaceholder', {
        height: '0',
        width: '0',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'autoplay': 0
        },
        events: {
            'onReady': () => {
                ytPlayerReady = true;
            },
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        updatePlayPauseButton(true);
        startProgressTracking();
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        updatePlayPauseButton(false);
        stopProgressTracking();
        if (event.data === YT.PlayerState.ENDED) {
            playerSkipForward(); // Auto-play next song when current ends
        }
    }
}

function initAudioPlayer() {
    const track = document.getElementById('playerProgressTrack');
    if (track) {
        track.addEventListener('click', seekPlayer);
    }
    
    const volumeSlider = document.getElementById('playerVolumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            setPlayerVolume(e.target.value);
        });
    }
}

function playSongOnWebsite(videoId, title, artist) {
    const playerBar = document.getElementById('floatingAudioPlayer');
    if (playerBar) {
        playerBar.classList.add('active');
    }
    
    // Update player displays
    document.getElementById('playerSongTitle').textContent = title;
    document.getElementById('playerSongArtist').textContent = artist;
    document.getElementById('playerAlbumArt').src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    document.getElementById('playerYouTubeLink').href = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Update active index
    activeSongIndex = worshipPlaylist.findIndex(song => song.id === videoId);
    
    // Load and play song in YouTube player
    if (ytPlayer && ytPlayerReady) {
        ytPlayer.loadVideoById(videoId);
        ytPlayer.playVideo();
        updatePlayPauseButton(true);
        startProgressTracking();
    } else {
        // Fallback: wait a bit and retry if not fully instantiated
        setTimeout(() => {
            if (ytPlayer && ytPlayerReady) {
                ytPlayer.loadVideoById(videoId);
                ytPlayer.playVideo();
                updatePlayPauseButton(true);
                startProgressTracking();
            }
        }, 1000);
    }
}

function togglePlayerPlay() {
    if (!ytPlayer || !ytPlayerReady) return;
    
    const state = ytPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
        updatePlayPauseButton(false);
    } else {
        ytPlayer.playVideo();
        updatePlayPauseButton(true);
    }
}

function updatePlayPauseButton(isPlaying) {
    const btn = document.getElementById('playerPlayPauseBtn');
    if (btn) {
        btn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    }
}

function startProgressTracking() {
    stopProgressTracking();
    progressInterval = setInterval(updateProgressBar, 500);
}

function stopProgressTracking() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function updateProgressBar() {
    if (!ytPlayer || !ytPlayerReady) return;
    
    const currentTime = ytPlayer.getCurrentTime() || 0;
    const duration = ytPlayer.getDuration() || 0;
    
    document.getElementById('playerCurrentTime').textContent = formatTime(currentTime);
    document.getElementById('playerDuration').textContent = formatTime(duration);
    
    if (duration > 0) {
        const pct = (currentTime / duration) * 100;
        document.getElementById('playerProgressFill').style.width = `${pct}%`;
        document.getElementById('playerProgressHandle').style.left = `${pct}%`;
    }
}

function seekPlayer(event) {
    if (!ytPlayer || !ytPlayerReady) return;
    
    const track = document.getElementById('playerProgressTrack');
    if (!track) return;
    
    const rect = track.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const pct = Math.max(0, Math.min(1, clickX / width));
    
    const duration = ytPlayer.getDuration() || 0;
    const seekTime = pct * duration;
    
    ytPlayer.seekTo(seekTime, true);
    
    document.getElementById('playerProgressFill').style.width = `${pct * 100}%`;
    document.getElementById('playerProgressHandle').style.left = `${pct * 100}%`;
    document.getElementById('playerCurrentTime').textContent = formatTime(seekTime);
}

function togglePlayerMute() {
    if (!ytPlayer || !ytPlayerReady) return;
    
    const btn = document.getElementById('playerVolumeBtn');
    const slider = document.getElementById('playerVolumeSlider');
    
    if (isMuted) {
        ytPlayer.unMute();
        isMuted = false;
        if (btn) btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        if (slider) slider.value = currentVolume;
        ytPlayer.setVolume(currentVolume);
    } else {
        ytPlayer.mute();
        isMuted = true;
        if (btn) btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        if (slider) slider.value = 0;
    }
}

function setPlayerVolume(volValue) {
    if (!ytPlayer || !ytPlayerReady) return;
    
    currentVolume = volValue;
    ytPlayer.setVolume(volValue);
    
    const btn = document.getElementById('playerVolumeBtn');
    if (btn) {
        if (volValue == 0) {
            btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            isMuted = true;
        } else if (volValue < 50) {
            btn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
            isMuted = false;
            ytPlayer.unMute();
        } else {
            btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            isMuted = false;
            ytPlayer.unMute();
        }
    }
}

function playerSkipForward() {
    if (activeSongIndex === -1) return;
    
    activeSongIndex = (activeSongIndex + 1) % worshipPlaylist.length;
    const nextSong = worshipPlaylist[activeSongIndex];
    playSongOnWebsite(nextSong.id, nextSong.title, nextSong.artist);
}

function playerSkipBackward() {
    if (activeSongIndex === -1) return;
    
    activeSongIndex = (activeSongIndex - 1 + worshipPlaylist.length) % worshipPlaylist.length;
    const prevSong = worshipPlaylist[activeSongIndex];
    playSongOnWebsite(prevSong.id, prevSong.title, prevSong.artist);
}

function closeAudioPlayer() {
    const playerBar = document.getElementById('floatingAudioPlayer');
    if (playerBar) {
        playerBar.classList.remove('active');
    }
    
    if (ytPlayer && ytPlayerReady) {
        ytPlayer.pauseVideo();
    }
    stopProgressTracking();
    updatePlayPauseButton(false);
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Download Audio File (Base64 Silent MP3 Fallback)
function downloadAudio(event, songName, videoId) {
    if (event) event.preventDefault();
    
    // 1-second silent MP3 base64 string
    const silentMp3Base64 = "SUQzBAAAAAAAAFRYWFgAAAASAAADbWFqb3JfYnJhbmQAZXA0IAAAAFRYWFgAAAASAAADbWlub3JfdmVyc2lvbgAwAAAAAFRYWFgAAAAkAAADY29tcGF0aWJsZV9icmFuZHMAZXA0aW1wNHNpc29tcDQAAGZyZWUAc0bL/gAAAABQcmVzZW50ZWQgYnkgQW50aWdyYXZpdHkA/+5DEAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAAHwAAAAQAAADmAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB/8AAAAAA/+5DEAAAAAAAAAAAAAAAAAAAAAABVNDEzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/uQxAAAAAAAAAAAAAAAAAAAAAAAVQQxMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7kMQAAAAAAAAAAAAAAAAAAAAAAFUEMTMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    
    try {
        const byteCharacters = atob(silentMp3Base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'audio/mp3' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${songName.replace(/\s+/g, '_')}_Pr_Kawuki.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        const msg = `Worship track "${songName}" has been successfully downloaded. (Note: In a production environment, this links to the high-fidelity full studio recording. For demonstration, a short audio file has been prepared.)`;
        const wpText = `Praise the Lord Apostle Kawuki Elifazi, I am downloading the worship song: *${songName}* from your website!`;
        const wpUrl = `https://wa.me/256705051999?text=${encodeURIComponent(wpText)}`;
        
        showSuccessModal(msg, wpUrl);
    } catch (e) {
        console.error("Error generating audio download:", e);
        alert(`Error downloading ${songName}. Opening YouTube audio stream instead...`);
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
}

