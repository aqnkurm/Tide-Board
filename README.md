# Tide Board - Interactive Mood Board Creator

![Tide Board](https://img.shields.io/badge/Tide%20Board-v0.1.0-6200EA)

Tide Board is a powerful, interactive web application for creating beautiful mood boards for your design projects, presentations, and creative work. Built with React and modern web technologies, it provides an intuitive drag-and-drop interface to arrange images, text, shapes, and colors on a customizable canvas.

## ✨ Features

- **Interactive Canvas**: Drag, resize, and arrange elements with precision
- **Multiple Element Types**:
  - Images: Upload and arrange your own images
  - Text: Add and style text with various formatting options
  - Shapes: Add rectangles, circles, and lines
  - Colors: Include color swatches for your palette
- **Rich Editing Tools**:
  - Resize elements with intuitive handles
  - Snap-to-grid functionality for precise alignment
  - Context menu for quick actions
  - Layer management for element stacking
- **Multiple Canvases**: Create and manage multiple canvases within a single board
- **Customization Options**:
  - Adjust canvas size and background color
  - Customize text with various fonts, sizes, and styles
  - Style shapes with different colors and border options
- **Project Management**: Create, save, and organize multiple boards
- **Export Options**: Save your designs for sharing and presentation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the source code

2. Navigate to the project directory
   ```bash
   cd "Mood Board"
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## 🔧 Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 💡 How to Use

### Creating a New Board

1. From the home page, click "Create New Board"
2. Enter a name for your board and select canvas dimensions
3. Click "Create" to start designing

### Adding Elements

- **Right-click** on the canvas to open the context menu
- Select the type of element you want to add:
  - Text: Adds editable text (double-click to edit)
  - Image: Opens file picker to upload an image
  - Shapes: Adds rectangles, circles, or lines

### Manipulating Elements

- **Click** on an element to select it
- **Drag** selected elements to reposition them
- **Resize** elements using the handles that appear when selected
- **Delete** elements by selecting them and pressing Delete/Backspace
- **Edit text** by double-clicking on text elements

### Using the Grid

- Toggle the grid on/off using the button in the bottom-right corner
- When the grid is active, elements will snap to grid lines for precise alignment

### Managing Canvases

- Create multiple canvases within a board using the canvas management tools
- Switch between canvases to work on different compositions

## 🛠️ Technologies Used

- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - For navigation
- [Emotion](https://emotion.sh/) - For styled components
- [React Draggable](https://github.com/react-grid-layout/react-draggable) - For drag functionality
- [React Resizable](https://github.com/react-grid-layout/react-resizable) - For resize functionality
- [html-to-image](https://github.com/bubkoo/html-to-image) & [jsPDF](https://github.com/parallax/jsPDF) - For exports
- [Vite](https://vitejs.dev/) - Build tool and development server

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Icons and design inspiration from various sources
- All the amazing open-source libraries that made this project possible

---

Built with ❤️ for designers and creatives everywhere.