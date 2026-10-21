# Roadmap

## M2D migration

- Move rendering, paddle controls, gravity and collisions to [M2D](https://github.com/mert574/m2d-engine).
- Preserve scoring and round progression while tuning ball and paddle behavior.
- Make opponent steering time-based so its behavior stays consistent across frame rates.
- Update development dependencies and add a build workflow through `package.json`.

## LAN multiplayer

- Add head-to-head LAN multiplayer with a local Node.js WebSocket server, match hosting/joining, synchronized game state and disconnect handling.
- Let players choose between a computer opponent and another player on the same network.
- Add configurable match targets, a winner display and rematch options.

## Controls and game flow

- Add a main menu, pause controls and an end-game menu with scores and restart options.
- Improve computer-opponent difficulty settings and paddle boundaries.
- Support responsive sizing and touch controls.

## Presentation

- Redesign the surrounding page, including layout, typography, colors, score display and control instructions, for desktop and mobile.
- Improve ball trails, paddle-hit feedback and round transitions.
