document.addEventListener('DOMContentLoaded', () => {

    if (window.lucide) {
        window.lucide.createIcons();
    }


    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-[#040508]/95', 'shadow-neon-sm');
        } else {
            header.classList.remove('bg-[#040508]/95', 'shadow-neon-sm');
        }
    });


    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    }

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('data-lucide', 'menu');
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    });


    const canvas = document.getElementById('circuit-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });


        const nodes = [];
        const maxNodes = 35;

        for (let i = 0; i < maxNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function drawCircuits() {
            ctx.clearRect(0, 0, width, height);
            

            ctx.strokeStyle = 'rgba(0, 210, 255, 0.08)';
            ctx.lineWidth = 1;

            for (let i = 0; i < nodes.length; i++) {
                const n1 = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                    if (dist < 180) {
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);

                        if (dist > 90) {
                            ctx.lineTo(n1.x + (n2.x - n1.x) / 2, n1.y);
                        }
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }


            nodes.forEach(node => {
                ctx.fillStyle = `rgba(0, 210, 255, ${node.alpha})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();


                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
            });

            requestAnimationFrame(drawCircuits);
        }

        drawCircuits();
    }


    const contactForm = document.getElementById('tech-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('full_name').value.trim();
            const phone = document.getElementById('whatsapp_num').value.trim();
            const service = document.getElementById('device_type').value;
            const description = document.getElementById('issue_desc').value.trim();
            const useWhatsapp = document.getElementById('send_whatsapp').checked;

            if (useWhatsapp) {

                const formatMessage = `Hola Compucor Tecnología! 👋\n\nHe enviado una consulta técnica desde la web:\n\n👤 *Nombre:* ${name}\n📞 *WhatsApp:* ${phone}\n🛠️ *Servicio solicitado:* ${service}\n📝 *Detalle:* ${description || 'No especificado'}`;
                const encodedText = encodeURIComponent(formatMessage);
                const customWhatsappUrl = `https://wa.me/5493564697913?text=${encodedText}`;
                
                window.open(customWhatsappUrl, '_blank');
            } else {
                alert('¡Muchas gracias por su consulta! El equipo de Compucor Tecnología se pondrá en contacto a la brevedad.');
                contactForm.reset();
            }
        });
    }
});
