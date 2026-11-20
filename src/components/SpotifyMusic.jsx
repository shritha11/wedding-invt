
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

const tracks = {
    te: "spotify:track:23WxsmliKISYaCfam8iPPG",
    hi: "spotify:track:1nvvaiJbrhCkM3Az74N1pM",
    en: "spotify:track:2SyVdOenmbDSjUGoFprS2x",
};

let spotifyApiPromise;

function loadSpotifyApi() {
    if (window.__weddingSpotifyAPI) {
        return Promise.resolve(window.__weddingSpotifyAPI);
    }

    if (!spotifyApiPromise) {
        spotifyApiPromise = new Promise((resolve, reject) => {
            window.onSpotifyIframeApiReady = (api) => {
                window.__weddingSpotifyAPI = api;
                resolve(api);
            };

            let script = document.querySelector(
                'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
            );

            if (!script) {
                script = document.createElement("script");
                script.src = "https://open.spotify.com/embed/iframe-api/v1";
                script.async = true;
                script.onerror = reject;
                document.body.appendChild(script);
            }
        });
    }

    return spotifyApiPromise;
}

const SpotifyMusic = forwardRef(function SpotifyMusic(
    { lang = "en", onPlaybackChange },
    ref
) {
    const containerRef = useRef(null);
    const controllerRef = useRef(null);
    const playingRef = useRef(false);
    const langRef = useRef(lang);
    const callbackRef = useRef(onPlaybackChange);

    useEffect(() => {
        callbackRef.current = onPlaybackChange;
    }, [onPlaybackChange]);

    useEffect(() => {
        langRef.current = lang;
    }, [lang]);

    useImperativeHandle(ref, () => ({
        toggle() {
            const controller = controllerRef.current;

            if (!controller) {
                console.warn("Spotify player is still loading.");
                return;
            }

            if (playingRef.current) {
                controller.pause();
                playingRef.current = false;
                callbackRef.current?.(false);
            } else {
                controller.play();
                playingRef.current = true;
                callbackRef.current?.(true);
            }
        },

        changeTrack(language) {
            langRef.current = language;

            const controller = controllerRef.current;
            if (!controller) return;

            const uri = tracks[language] || tracks.en;

            controller.loadEntity(uri);

            if (playingRef.current) {
                controller.play();
            }
        },
    }), []);

    useEffect(() => {
        let cancelled = false;
        let createdController = null;

        loadSpotifyApi()
            .then((api) => {
                if (cancelled || !containerRef.current) return;

                api.createController(
                    containerRef.current,
                    {
                        uri: tracks[langRef.current] || tracks.en,
                        width: "100%",
                        height: "152",
                    },
                    (controller) => {
                        if (cancelled) {
                            controller.destroy();
                            return;
                        }

                        createdController = controller;
                        controllerRef.current = controller;

                        controller.addListener("playback_update", (event) => {
                            const isPlaying = !event.data.isPaused;

                            playingRef.current = isPlaying;
                            callbackRef.current?.(isPlaying);
                        });

                        console.log("Spotify wedding player ready!");
                    }
                );
            })
            .catch((error) => {
                console.error("Unable to load Spotify player:", error);
            });

        return () => {
            cancelled = true;

            if (createdController) {
                createdController.destroy();
            }

            controllerRef.current = null;
        };
    }, []);

    return (
        <div className="
      fixed bottom-[105px] right-4 z-[95]
      w-[min(320px,calc(100vw-32px))]
      overflow-hidden rounded-xl
      border border-[#DCCDB5]
      bg-[#FFFCF5]
      shadow-[0_12px_35px_rgba(35,55,42,0.20)]
    ">
            <div
                ref={containerRef}
                className="min-h-[152px] w-full"
            />
        </div>
    );
});

export default SpotifyMusic;
