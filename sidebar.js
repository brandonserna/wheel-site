// Toggle manufacturer dropdown
function toggleManufacturer(manufacturer) {
    const dropdown = document.getElementById(`${manufacturer}-wheels`);
    const button = event.currentTarget;
    const arrow = button.querySelector('svg');

    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        arrow.style.transform = 'rotate(90deg)';
    } else {
        dropdown.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Mobile sidebar toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('-translate-x-full');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth < 1024) {
                if (!sidebar.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                    sidebar.classList.add('-translate-x-full');
                }
            }
        });
    }

    // Search functionality
    const searchInput = document.getElementById('wheelSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const allWheelLinks = document.querySelectorAll('nav a[href^="wheels/"]');

            allWheelLinks.forEach(link => {
                const wheelName = link.textContent.toLowerCase();
                const parentDropdown = link.closest('[id$="-wheels"]');

                if (wheelName.includes(searchTerm)) {
                    link.style.display = 'block';
                    if (parentDropdown && searchTerm) {
                        parentDropdown.classList.remove('hidden');
                    }
                } else {
                    link.style.display = 'none';
                }
            });

            // If search is empty, hide all dropdowns
            if (!searchTerm) {
                document.querySelectorAll('[id$="-wheels"]').forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
            }
        });
    }
});
