
            // for section 2 - text transition//
            // Section 2.1: Author credit hold-and-fade -> Opening poem line reveal
            document.addEventListener('DOMContentLoaded', () => {
                const deoSection = document.getElementById('deothamtham');
                if (!deoSection) return;

                const deoObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            deoObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.35 });
                deoObserver.observe(deoSection);
            }, { once: true });

            // use javascript for letter steps - section 2//
            document.addEventListener('DOMContentLoaded', () => {
            const stage = document.getElementById('envelope-stage');
            const clickArea = document.getElementById('envelope-click-area');
            const hint = document.getElementById('click-hint');
            if (!stage || !clickArea || !hint) return;
            const card3 = stage.querySelector('.card-3');
            const card3Home = card3?.parentElement;
            if (!card3 || !card3Home) return;

            let currentStep = 0;
            let card3ScrollStart = null;
            let card3StartRect = null;

            const restoreCard3ToEnvelope = () => {
                card3Home.appendChild(card3);
                card3.classList.add('photo-card');
                card3.removeAttribute('style');
            };
           // use javascript for zoom scrolling setting//
            const updateCardScrollZoom = () => {
                const section = document.getElementById('letter');
                const scene = document.getElementById('corn');
                const targetImage = document.getElementById('section3-image');
                if (!section || !scene || !targetImage || currentStep !== 5) return;
                if (card3ScrollStart === null) card3ScrollStart = window.scrollY;
                if (!card3StartRect) card3StartRect = card3.getBoundingClientRect();

                const sceneStart = scene.getBoundingClientRect().top + window.scrollY;
                const distance = Math.max(1, sceneStart - card3ScrollStart);
                const scrollProgress = Math.min(
                    1,
                    Math.max(0, (window.scrollY - card3ScrollStart) / distance)
                );

                if (scrollProgress === 0) {
                    if (card3.style.position === 'fixed') {
                        restoreCard3ToEnvelope();
                        card3ScrollStart = window.scrollY;
                        card3StartRect = card3.getBoundingClientRect();
                    }
                    return;
                }

                if (!card3.naturalWidth || !card3.naturalHeight) return;
                const targetRect = targetImage.getBoundingClientRect();
                if (!targetRect.width || !targetRect.height) return;
                const aspectRatio = card3.naturalWidth / card3.naturalHeight;
                const targetWidth = Math.min(targetRect.width, targetRect.height * aspectRatio);
                const targetHeight = targetWidth / aspectRatio;
                const targetLeft = targetRect.left + (targetRect.width - targetWidth) / 2;
                const targetTopAtScene = targetRect.top + window.scrollY - sceneStart +
                    (targetRect.height - targetHeight) / 2;
                const start = card3StartRect;
                const fadeProgress = Math.min(1, Math.max(0, (scrollProgress - 0.72) / 0.28));

                card3.style.position = 'fixed';
                card3.style.left = `${start.left + (targetLeft - start.left) * scrollProgress}px`;
                card3.style.top = `${start.top + (targetTopAtScene - start.top) * scrollProgress}px`;
                card3.style.width = `${start.width + (targetWidth - start.width) * scrollProgress}px`;
                card3.style.height = 'auto';
                card3.style.transform = `rotate(${2 * (1 - scrollProgress)}deg)`;
                card3.style.zIndex = '100';
                card3.style.opacity = `${1 - fadeProgress}`;
            };

            // use javascript for mouse guide //
            clickArea.addEventListener('click', () => {
                currentStep = currentStep >= 6 ? 0 : currentStep + 1;
                stage.setAttribute('data-step', currentStep);

                if (currentStep === 5) {
                    card3ScrollStart = window.scrollY;
                    card3StartRect = null;
                } else {
                    restoreCard3ToEnvelope();
                    card3ScrollStart = null;
                    card3StartRect = null;
                }
                updateCardScrollZoom();

                if (currentStep === 0) hint.textContent = "Chạm vào thư để mở";
                else if (currentStep <= 4) hint.textContent = "Tiếp tục mở";
                else hint.textContent = "Cuộn xuống nào!";
            });

            window.addEventListener('scroll', updateCardScrollZoom, { passive: true });
            window.addEventListener('resize', updateCardScrollZoom);
            updateCardScrollZoom();
            });


        document.addEventListener('DOMContentLoaded', () => {
                const cornSection = document.getElementById('corn');
                if (!cornSection) return;

                const cornObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            cornObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.25 });
                cornObserver.observe(cornSection);
            }, { once: true });
        
        document.addEventListener('DOMContentLoaded', () => {
            const corns = document.querySelectorAll('.draggable-corn');
            corns.forEach((corn) => {
                let isDragging = false;
                let startX = 0;
                let startY = 0;
                let currentX = 0;
                let currentY = 0;
                let currentXRatio = 0;
                let currentYRatio = 0;
                const stage = corn.parentElement;

                const applyDragOffset = () => {
                    const rect = stage.getBoundingClientRect();
                    currentX = currentXRatio * rect.width;
                    currentY = currentYRatio * rect.height;
                    corn.style.transform = `translate(${currentX}px, ${currentY}px)`;
                };

                corn.addEventListener('pointerdown', (e) => {
                    isDragging = true;
                    corn.classList.add('is-dragging');
                    corn.setPointerCapture(e.pointerId);
                    const rect = stage.getBoundingClientRect();
                    currentX = currentXRatio * rect.width;
                    currentY = currentYRatio * rect.height;
                    startX = e.clientX - currentX;
                    startY = e.clientY - currentY;
                });

                corn.addEventListener('pointermove', (e) => {
                    if (!isDragging) return;
                    currentX = e.clientX - startX;
                    currentY = e.clientY - startY;
                    const rect = stage.getBoundingClientRect();
                    currentXRatio = currentX / rect.width;
                    currentYRatio = currentY / rect.height;
                    corn.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
                });

                const stopDragging = (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    corn.classList.remove('is-dragging');
                    if (corn.hasPointerCapture(e.pointerId)) {
                        corn.releasePointerCapture(e.pointerId);
                    }
                    corn.style.transform = `translate(${currentX}px, ${currentY}px)`;
                };

                corn.addEventListener('pointerup', stopDragging);
                corn.addEventListener('pointercancel', stopDragging);
                window.addEventListener('resize', () => {
                    if (currentXRatio !== 0 || currentYRatio !== 0) applyDragOffset();
                });
            });
        });

        // Section 4: Orchid reveal, petal fading, and stanza interactions
        document.addEventListener('DOMContentLoaded', () => {
            const orchidSection = document.getElementById('orchid');
            if (!orchidSection) return;

            const orchidObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        orchidObserver.unobserve(entry.target);
                    }
                });
            });
            orchidObserver.observe(orchidSection);

            const petalHits = orchidSection.querySelectorAll('.petal-hit');
            petalHits.forEach((hit) => {
                hit.addEventListener('click', () => {
                    const targetClass = hit.dataset.target;
                    const petalImg = orchidSection.querySelector(`.orchid-petal-layer.${targetClass}`);
                    if (!petalImg || petalImg.classList.contains('is-faded')) return;

                    petalImg.classList.add('is-faded');
                    hit.classList.add('is-used');
                    hit.disabled = true;
                });
            });

            const stanzaLines = orchidSection.querySelectorAll('.orchid-line-1, .orchid-line-2');
            stanzaLines.forEach((line) => {
                const disperseLine = () => {
                    if (!line.classList.contains('is-dispersing')) {
                        line.classList.add('is-dispersing');
                    }
                };

                line.addEventListener('click', disperseLine);
                line.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        disperseLine();
                    }
                });
            });
        }, { once: true });

        // Section 5: Scroll-driven zoom & converging left/right strips
        document.addEventListener('DOMContentLoaded', () => {
            const villageSection = document.getElementById('village');
            if (!villageSection) return;

            const updateVillageScroll = () => {
                const rect = villageSection.getBoundingClientRect();
                const viewH = window.innerHeight;

                // Progress runs from 0 (when top enters bottom of screen) to 1 (when centered)
                const rawProgress = (viewH * 0.9 - rect.top) / (viewH * 0.75);
                const clamped = Math.min(1, Math.max(0, rawProgress));
                villageSection.style.setProperty('--village-progress', clamped.toFixed(3));
            };

            window.addEventListener('scroll', updateVillageScroll, { passive: true });
            window.addEventListener('resize', updateVillageScroll);
            updateVillageScroll();

            // Interactive smoke dispersion where cursor hovers over the blue strips
            const smokeStrips = villageSection.querySelectorAll('.smoke-dispersable');
            smokeStrips.forEach((strip) => {
                let clearRadius = 0;
                let targetRadius = 0;
                let rafId = null;

                const animateMask = () => {
                    clearRadius += (targetRadius - clearRadius) * 0.05;
                    strip.style.setProperty('--clear-radius', `${clearRadius.toFixed(1)}px`);

                    if (Math.abs(targetRadius - clearRadius) > 0.5) {
                        rafId = requestAnimationFrame(animateMask);
                    } else {
                        clearRadius = targetRadius;
                        strip.style.setProperty('--clear-radius', `${clearRadius}px`);
                        rafId = null;
                    }
                };

                strip.addEventListener('pointermove', (e) => {
                    const rect = strip.getBoundingClientRect();
                    strip.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                    strip.style.setProperty('--my', `${e.clientY - rect.top}px`);
                    strip.classList.add('is-hovering');
                    targetRadius = 105; // 30% smaller cleared smoke pocket
                    if (!rafId) rafId = requestAnimationFrame(animateMask);
                });

                strip.addEventListener('pointerleave', () => {
                    strip.classList.remove('is-hovering');
                    targetRadius = 0; // Smoke gently drifts back when mouse leaves
                    if (!rafId) rafId = requestAnimationFrame(animateMask);
                });
            });
        }, { once: true });

        // Section 6: Pink steam scroll reveal + 6-step sticky rice unwrap
        document.addEventListener('DOMContentLoaded', () => {
            const xoiSection = document.getElementById('xoi');
            if (xoiSection) {
                const xoiObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            xoiObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });
                xoiObserver.observe(xoiSection);
            }

            const xoiStage = document.getElementById('xoi-stage');
            const xoiHint = document.getElementById('xoi-hint');
            if (xoiStage && xoiHint) {
                let xoiStep = 0;
                const maxXoiStep = 5; // 6 frames total (index 0 to 5)

                xoiStage.addEventListener('click', () => {
                    xoiStep = xoiStep >= maxXoiStep ? 0 : xoiStep + 1;
                    xoiStage.setAttribute('data-step', xoiStep);

                    if (xoiStep === 0) {
                        xoiHint.textContent = "Chạm vào giỏ xôi để mở lá";
                    } else if (xoiStep < maxXoiStep) {
                        xoiHint.textContent = `Tiếp tục mở`;
                    } else {
                        xoiHint.textContent = "Cuộn xuống nào";
                    }
                });
            }
        }, { once: true });
        // Section 7: Campfire scroll reveal + "Múa Xòe" outward text spread along curve // 
        document.addEventListener('DOMContentLoaded', () => {
            const campfireSection = document.getElementById('campfire');
            const xoeLeftTp = document.getElementById('xoe-left-tp');
            const xoeRightTp = document.getElementById('xoe-right-tp');

            if (campfireSection) {
                const campfireObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            campfireObserver.unobserve(entry.target);

                            // Smoothly fan ("xòe") the two halves outward along the arch after appearing at center
                            if (xoeLeftTp && xoeRightTp) {
                                setTimeout(() => {
                                    const duration = 1200; // 1.2s smooth spread
                                    const startTime = performance.now();
                                    const spreadAmount = 4.5; // % along path to fan outward (increase for wider gap)

                                    const animateXoe = (now) => {
                                        const t = Math.min(1, (now - startTime) / duration);
                                        const easeOut = 1 - Math.pow(1 - t, 3);
                                        xoeLeftTp.setAttribute('startOffset', `${50 - spreadAmount * easeOut}%`);
                                        xoeRightTp.setAttribute('startOffset', `${50 + spreadAmount * easeOut}%`);
                                        if (t < 1) requestAnimationFrame(animateXoe);
                                    };
                                    requestAnimationFrame(animateXoe);
                                }, 350);
                            }
                        }
                    });
                }, { threshold: 0.2 });
                campfireObserver.observe(campfireSection);
            }
        }, { once: true });

        // Section 8: Brocade fabric scroll reveal
        document.addEventListener('DOMContentLoaded', () => {
            const fabricSection = document.getElementById('fabric');
            if (!fabricSection) return;

            const fabricObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        fabricObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            fabricObserver.observe(fabricSection);
        }, { once: true });

        // Section 9: Cao Phong Orange scroll reveal + click-to-drop inside sandwiched basket
        document.addEventListener('DOMContentLoaded', () => {
            const orangeSection = document.getElementById('orange');
            if (orangeSection) {
                const orangeObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            orangeObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });
                orangeObserver.observe(orangeSection);
            }

            const clickableOrange = document.getElementById('clickable-orange');
            const orangeBasket = document.getElementById('orange-basket');
            const orangeFruitMotion = orangeSection
                ? orangeSection.querySelector('.orange-fruit-motion')
                : null;
            if (clickableOrange && orangeBasket && orangeFruitMotion) {
                clickableOrange.addEventListener('click', () => {
                    if (clickableOrange.classList.contains('is-dropping')) return;
                    clickableOrange.classList.add('is-dropping');
                    orangeFruitMotion.classList.add('is-dropping');

                    setTimeout(() => {
                        clickableOrange.classList.add('is-fallen');
                        setTimeout(() => {
                            orangeBasket.classList.add('is-catching');
                        }, 880);
                    }, 220);
                });
            }
        }, { once: true });
        // Section 10: Scroll-driven converging clouds + letter & handwriting finale reveal
        document.addEventListener('DOMContentLoaded', () => {
            const endingSection = document.getElementById('ending');
            if (!endingSection) return;

            const updateEndingScroll = () => {
                const rect = endingSection.getBoundingClientRect();
                const viewH = window.innerHeight;

                // Moves left & right clouds from outer edges to center as user scrolls to bottom
                const rawProgress = (viewH * 0.95 - rect.top) / (viewH * 0.65);
                const clamped = Math.min(1, Math.max(0, rawProgress));
                endingSection.style.setProperty('--ending-progress', clamped.toFixed(3));
            };

            window.addEventListener('scroll', updateEndingScroll, { passive: true });
            window.addEventListener('resize', updateEndingScroll);
            updateEndingScroll();

            const endingObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        endingObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });
            endingObserver.observe(endingSection);

            const pinkNote = document.getElementById('pink-note-stage');
            if (pinkNote) {
                const togglePinkNote = () => {
                    const isOpen = pinkNote.getAttribute('data-open') === 'true';
                    pinkNote.setAttribute('data-open', String(!isOpen));
                };
                pinkNote.addEventListener('click', togglePinkNote);
                pinkNote.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        togglePinkNote();
                    }
                });
            }
        }, { once: true });

        document.addEventListener('DOMContentLoaded', () => {
            const musicButton = document.getElementById('music-stamp-btn');
            const backgroundMusic = document.getElementById('background-music');
            if (!musicButton || !backgroundMusic) return;

            backgroundMusic.volume = 0.2;

            const updateMusicButton = () => {
                const isPlaying = !backgroundMusic.paused;
                musicButton.classList.toggle('is-playing', isPlaying);
                musicButton.setAttribute('aria-pressed', String(isPlaying));
                const label = isPlaying ? 'Pause background music' : 'Play background music';
                musicButton.title = label;
                musicButton.setAttribute('aria-label', label);
            };

            musicButton.addEventListener('click', () => {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch((error) => {
                        updateMusicButton();
                        console.error('Unable to play background music:', error);
                    });
                } else {
                    backgroundMusic.pause();
                }
                updateMusicButton();
            });

            backgroundMusic.addEventListener('play', updateMusicButton);
            backgroundMusic.addEventListener('pause', updateMusicButton);
            updateMusicButton();
        }, { once: true });