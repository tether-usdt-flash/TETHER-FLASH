// Auth Navigation Handler
(function() {
    function updateNav() {
        const userData = localStorage.getItem('user');
        const authBtns = document.getElementById('authButtons');
        if (!authBtns) return;
        
        authBtns.style.opacity = '0';
        setTimeout(() => {
            if (userData) {
                const user = JSON.parse(userData);
                const initial = (user.name || user.email || 'U')[0].toUpperCase();
                const email = user.email || 'user@example.com';
                
                authBtns.innerHTML = `
                    <div class="relative">
                        <button onclick="toggleUserMenu()" class="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 group">
                            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-emerald-500/50 transition-all">${initial}</div>
                            <span class="text-white text-sm font-medium hidden sm:block">${email}</span>
                            <i class="fas fa-chevron-down text-white/70 text-xs transition-transform duration-300" id="userMenuIcon"></i>
                        </button>
                        <div id="userMenu" class="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 opacity-0 invisible translate-y-2 transition-all duration-300 overflow-hidden">
                            <div class="p-2">
                                <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all group">
                                    <i class="fas fa-sign-out-alt text-red-400 group-hover:scale-110 transition-transform"></i>
                                    <span class="text-white font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                authBtns.innerHTML = `
                    <a href="pages/login.html" class="relative px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-300 hover:scale-105 overflow-hidden group border border-white/20 hover:border-emerald-400/50">
                        <div class="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 group-hover:from-emerald-500/20 group-hover:to-emerald-600/10 transition-all duration-300"></div>
                        <span class="relative">Login</span>
                    </a>
                `;
            }
            authBtns.style.opacity = '1';
        }, 200);
    }
    
    window.toggleUserMenu = function() {
        const menu = document.getElementById('userMenu');
        const icon = document.getElementById('userMenuIcon');
        if (!menu) return;
        
        const isOpen = menu.classList.contains('opacity-100');
        if (isOpen) {
            menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
            icon?.classList.remove('rotate-180');
        } else {
            menu.classList.add('opacity-100', 'visible', 'translate-y-0');
            menu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
            icon?.classList.add('rotate-180');
        }
    };
    
    window.logout = function() {
        localStorage.removeItem('user');
        updateNav();
        setTimeout(() => window.location.href = 'index.html', 300);
    };
    
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('userMenu');
        if (menu && !e.target.closest('#authButtons')) {
            menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
            document.getElementById('userMenuIcon')?.classList.remove('rotate-180');
        }
    });
    
    document.addEventListener('DOMContentLoaded', updateNav);
    window.addEventListener('storage', updateNav);
})();
