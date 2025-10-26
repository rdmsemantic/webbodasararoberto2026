 // Navigation functionality
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        function showSection(targetId) {
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            const activeLink = document.querySelector(`[data-section="${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                showSection(targetSection);
                
                // Smooth scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
        
        // Attire tab functionality
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(targetTab + '-tab').classList.add('active');
            });
        });
        
        // RSVP form functionality
        const form = document.getElementById('rsvp-form');
        const attendanceRadios = document.querySelectorAll('input[name="Confirmas tu asistencia"]');
        const companionsGroup = document.getElementById('companions-group');
        const mainDishGroup = document.getElementById('main-dish-group');
        const accommodationGroup = document.getElementById('accommodation-group');
        const dietaryGroup = document.getElementById('dietary-group');
        const companionsInput = document.getElementById('companions');
        const successMessage = document.getElementById('success-message');
        
        // Show/hide companion fields based on attendance
        attendanceRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'Sí, asistiré' && radio.checked) {
                    companionsGroup.style.display = 'block';
                    dietaryGroup.style.display = 'block';
                    accommodationGroup.style.display = 'block';
                } else {
                    companionsGroup.style.display = 'none';
                    dynamicCompanionsContainer.innerHTML = '';
                    dietaryGroup.style.display = 'none';
                    accommodationGroup.style.display = 'none';
                }
            });
        });
        
        // Dynamic companions functionality
        const dynamicCompanionsContainer = document.getElementById('dynamic-companions-container');
        
        function createCompanionFields(companionNumber) {
            const companionDiv = document.createElement('div');
            companionDiv.className = 'companion-group';
            companionDiv.setAttribute('data-companion', companionNumber);
            
            companionDiv.innerHTML = `
                <div class="form-group">
                    <label for="companion-name-${companionNumber}" class="form-label">Nombre y apellidos del acompañante ${companionNumber} *</label>
                    <input type="text" id="companion-name-${companionNumber}" name="Nombre acompañante ${companionNumber}" class="form-control companion-name" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Plato principal acompañante ${companionNumber} *</label>
                    <div class="radio-group">
                        <div class="radio-option">
                            <input type="radio" id="companion-dish-vegan-${companionNumber}" name="Plato acompañante ${companionNumber}" value="Vegano" class="companion-dish" required>
                            <label for="companion-dish-vegan-${companionNumber}">Vegano</label>
                        </div>
                        <div class="radio-option">
                            <input type="radio" id="companion-dish-meat-${companionNumber}" name="Plato acompañante ${companionNumber}" value="Carne">
                            <label for="companion-dish-meat-${companionNumber}">Carne</label>
                        </div>
                    </div>
                </div>
            `;
             // Si es el primer acompañante, poner foco en su campo de nombre
            if (companionNumber === 1) {
                // Espera un pequeño instante para que el elemento esté en el DOM
                setTimeout(() => {
                    companionDiv.querySelector(`#companion-name-${companionNumber}`).focus();
                }, 0);
            }
            return companionDiv;
        }
        
        function updateCompanionFields() {
            const companionsCount = parseInt(companionsInput.value) || 0;
            
            // Clear existing companion fields
            dynamicCompanionsContainer.innerHTML = '';
            
            // Create new companion fields
            for (let i = 1; i <= companionsCount; i++) {
                const companionField = createCompanionFields(i);
                dynamicCompanionsContainer.appendChild(companionField);
            }
        }
        
        // Update companion fields when number changes
        companionsInput.addEventListener('change', updateCompanionFields);
        
        // Form submission
        form.addEventListener('submit', (e) => {
            // Validate required fields before submission
            const fullName = document.getElementById('fullName').value;
            const attendance = document.querySelector('input[name="Confirmas tu asistencia"]:checked');
            const mainDish = document.querySelector('input[name="Plato principal"]:checked');
            
            if (!fullName.trim()) {
                alert('Por favor, introduce tu nombre y apellidos.');
                e.preventDefault();
                return;
            }
            
            if (!attendance) {
                alert('Por favor, confirma si asistirás a la boda.');
                e.preventDefault();
                return;
            }
            
            if (attendance.value === 'Sí, asistiré') {
                if (!mainDish) {
                    alert('Por favor, selecciona tu preferencia de plato principal.');
                    e.preventDefault();
                    return;
                }
                
                // Validate companion fields if there are companions
                const companionsCount = parseInt(companionsInput.value) || 0;
                if (companionsCount > 0) {
                    const companionNames = document.querySelectorAll('.companion-name');
                    const companionDishes = document.querySelectorAll('.companion-dish');
                    
                    // Check all companion names are filled
                    for (let i = 0; i < companionNames.length; i++) {
                        if (!companionNames[i].value.trim()) {
                            alert(`Por favor, introduce el nombre del acompañante ${i + 1}.`);
                            e.preventDefault();
                            return;
                        }
                    }
                    
                    // Check all companion dishes are selected
                    for (let i = 1; i <= companionsCount; i++) {
                        const dishSelected = document.querySelector(`input[name="Plato acompañante ${i}"]:checked`);
                        if (!dishSelected) {
                            alert(`Por favor, selecciona la preferencia de plato para el acompañante ${i}.`);
                            e.preventDefault();
                            return;
                        }
                    }
                }
            }
            
            // If validation passes, allow form submission to FormSubmit
            // FormSubmit will handle the email sending and redirect to confirmation page
        });
        
        // Initialize Map
        function initializeMap() {
            // Map coordinates for Hacienda el Charruado
            const lat = 36.753414;
            const lng = -6.365233;
            
            // Initialize the map
            const map = L.map('venue-map').setView([lat, lng], 15);
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Custom marker icon
            const customIcon = L.divIcon({
                className: 'custom-div-icon',
                html: '<div style="background-color: var(--color-primary); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            
            // Add marker with popup
            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
            
            const popupContent = `
                <div class="custom-popup">
                    <h4>Hacienda el Charruado</h4>
                    <p><strong>Dirección:</strong> Crta. de Munive, Km 3</p>
                    <p>11540 Sanlúcar de Barrameda, Cádiz</p>
                    <p><strong>Teléfono:</strong> 687 085 330</p>
                    <p style="margin-top: var(--space-8); color: var(--color-gold); font-weight: var(--font-weight-medium);">¡Te esperamos el 4 de julio de 2026!</p>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            
            // Add click event to marker
            marker.on('click', function() {
                marker.openPopup();
            });
            
            // Add map controls
            map.zoomControl.setPosition('topright');
            
            return map;
        }
        
        // Initialize map when venue section is shown
        let venueMap = null;
        
        function showSection(targetId) {
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Initialize map when venue section is shown
                if (targetId === 'venue' && !venueMap) {
                    setTimeout(() => {
                        venueMap = initializeMap();
                    }, 100);
                }
                
                // Invalidate map size when switching sections (fixes map display issues)
                if (targetId === 'venue' && venueMap) {
                    setTimeout(() => {
                        venueMap.invalidateSize();
                    }, 150);
                }
            }
            
            const activeLink = document.querySelector(`[data-section="${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
        
        // Check URL for confirmation redirect
        window.addEventListener('load', () => {
            // Check if we're returning from FormSubmit
            const urlParams = new URLSearchParams(window.location.search);
            const hash = window.location.hash;
            
            if (hash === '#confirmation' || urlParams.get('submitted') === 'true') {
                showSection('confirmation');
                // Clean URL
                history.replaceState(null, null, window.location.pathname);
            }
        });
        
        // Carousel functionality
        let carouselPositions = {};
        
        function initializeCarousel(carouselId) {
            if (!carouselPositions[carouselId]) {
                carouselPositions[carouselId] = 0;
            }
        }
        
        function moveCarousel(carouselId, direction) {
            initializeCarousel(carouselId);
            
            const carousel = document.getElementById(carouselId);
            if (!carousel) return;
            
            const container = carousel.querySelector('.carousel-container');
            const slides = carousel.querySelectorAll('.carousel-slide');
            const indicators = carousel.querySelectorAll('.carousel-indicator');
            const totalSlides = slides.length;
            
            if (totalSlides === 0) return;
            
            carouselPositions[carouselId] += direction;
            
            if (carouselPositions[carouselId] >= totalSlides) {
                carouselPositions[carouselId] = 0;
            } else if (carouselPositions[carouselId] < 0) {
                carouselPositions[carouselId] = totalSlides - 1;
            }
            
            const translateX = -carouselPositions[carouselId] * 100;
            container.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === carouselPositions[carouselId]) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        function goToSlide(carouselId, slideIndex) {
            initializeCarousel(carouselId);
            
            const carousel = document.getElementById(carouselId);
            if (!carousel) return;
            
            const container = carousel.querySelector('.carousel-container');
            const slides = carousel.querySelectorAll('.carousel-slide');
            const indicators = carousel.querySelectorAll('.carousel-indicator');
            const totalSlides = slides.length;
            
            if (slideIndex < 0 || slideIndex >= totalSlides) return;
            
            carouselPositions[carouselId] = slideIndex;
            
            const translateX = -carouselPositions[carouselId] * 100;
            container.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === slideIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Initialize all carousels on page load
        document.addEventListener('DOMContentLoaded', () => {
            const carousels = document.querySelectorAll('.image-carousel');
            carousels.forEach(carousel => {
                const carouselId = carousel.id;
                if (carouselId) {
                    initializeCarousel(carouselId);
                }
            });
        });
        
        // Add some elegant animations
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navigation');
            if (window.scrollY > 100) {
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } 
        });

        attendanceRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const dishRadios = document.querySelectorAll('input[name="Plato principal"]');
                if (radio.value === "Sí, asistiré" && radio.checked) {
                // Mostrar grupos dependientes y activar "required"
                companionsGroup.style.display = "block";
                dietaryGroup.style.display = "block";
                mainDishGroup.style.display = "block";
                accommodationGroup.style.display = "block";
                dishRadios.forEach(d => d.required = true);
                } else {
                // Ocultar y eliminar "required"
                companionsGroup.style.display = "none";
                dynamicCompanionsContainer.innerHTML = "";
                dietaryGroup.style.display = "none";
                mainDishGroup.style.display = "none";
                accommodationGroup.style.display = "none";
                dishRadios.forEach(d => d.required = false);
                }
            });
            });