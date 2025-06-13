# 🎵 Music Player UI

A sleek, responsive music player with dynamic color themes and glass-morphism design. Perfect for showcasing your favorite tracks with style.

![Music Player Screenshot](https://music-ui-teal.vercel.app/screenshot.jpg)

**Live Demo:** [https://music-ui-teal.vercel.app/](https://music-ui-teal.vercel.app/)

## ✨ Features

- **6 Dynamic Color Themes** (blue, orange, red, dark-green, green, dark-maroon)
- **Glass-morphism UI** with backdrop filters
- **Full Playback Controls**:
  - Replay current song
  - Previous/next track
  - Play/pause
- **Visual Progress Tracking**:
  - Interactive seek bar
  - Current time/duration display
- **Album Art Display**
- **Mobile Responsive** design
- **Auto-play** with fallback for mobile restrictions

## 🛠️ Technical Stack

- **HTML5** (semantic structure)
- **CSS3** (custom properties, transitions, gradients)
- **JavaScript** (audio API, DOM manipulation)
- **Font Awesome** (icons)
- **Vercel** (hosting)

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/music-player-ui.git
   cd music-player-ui
   ```

2. **Add your music files**:
   - Place MP3 files in project root
   - Add album art PNGs/JPGs
   - Update `playlist` array in `script.js`

3. **Deploy to Vercel**:
   - Push to GitHub
   - Import project in Vercel
   - Deploy!

## 🎨 Customization

### Change Color Themes
Edit the gradient values in `styles.css`:
```css
.background.your-color {
  background: linear-gradient(135deg, #HEX, #HEX);
}
```

### Add More Songs
Extend the playlist array in `script.js`:
```javascript
{
  title: "Song Name",
  artist: "Artist Name",
  audioSrc: "file.mp3",
  albumArt: "image.png",
  color: "theme-color" // Must match CSS class
}
```

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅       |
| Firefox | ✅       |
| Safari  | ✅*      |
| Edge    | ✅       |

*Safari requires user interaction for audio playback

## 📝 License

MIT License - Free for personal and commercial use

## 🙏 Credits

- UI Design by [Your Name]
- Font Awesome icons
- Modern CSS techniques

---

Enjoy your music! 🎧 For issues or feature requests, please open an issue on GitHub.
