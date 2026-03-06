# 🐱 CatApp

A React application that lets you browse, search, and customize cat images using the [CATAAS (Cat as a Service)](https://cataas.com) API.

## Features

- **Random cat generator** — fetch a new random cat image or GIF on demand
- **Tag-based search** — search cats by tag with autocomplete suggestions
- **Caption overlay** — add custom text captions to any cat image
- **Image download** — save the current cat (with or without caption) to your device
- **List / grid view** — toggle between a single large image and a paginated grid of 20 cats
- **GIF support** — switch between static images and animated GIFs

## Tech Stack

- [React](https://react.dev/) with hooks (`useState`, `useEffect`)
- [Vite](https://vitejs.dev/) 
- [CATAAS API](https://cataas.com/doc.html) — free public cat image API

## Project Structure

```
src/
├── App.jsx               # Root component, state orchestration
├── main.jsx              # React entry point
├── Components/
│   ├── AddText.jsx       # Caption text input
│   ├── CardList.jsx      # Grid view of cat thumbnails
│   ├── SearchBar.jsx     # Tag search input with autocomplete
│   ├── SelectType.jsx    # Image / GIF type selector
│   └── ToggleButton.jsx  # Toggle between single and list view
└── Utils/
    └── useCat.jsx        # Custom hook — all API logic and state
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/skyylord0/Cat-cards.git
cd Cat-cards
npm install
```

### Running locally

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

All API interactions are handled in the `useCat` custom hook:

| Function | Description |
|---|---|
| `handleNewCat()` | Fetches a single random cat (optionally filtered by tag/type) |
| `handleNewCats(index)` | Fetches a batch of 20 cats for the grid view |
| `handleNextCats()` | Advances to the next page of 20 cats |
| `handlePreviousCats()` | Goes back to the previous page of 20 cats |
| `handleAddCaption()` | Applies a text caption to the current cat URL |
| `handleDownload()` | Downloads the current image as `.jpg` or `.gif` |

### API Endpoints Used

```
GET https://cataas.com/cat?json=true           # Random image
GET https://cataas.com/cat/gif?json=true       # Random GIF
GET https://cataas.com/api/cats?tags=<tag>     # Cats filtered by tag
GET https://cataas.com/cat/<id>/says/<text>    # Cat with caption
GET https://cataas.com/api/tags                # All available tags
```

## Usage

1. Click **🐱 New Cat** to load a random cat image
2. Use the **search bar** to filter by tag (e.g. `cute`, `funny`, `orange`) — press Enter or click a suggestion
3. Use the **type selector** to switch between static images and GIFs
4. Type a caption in the text field and press Enter or click **💬 Add Caption**
5. Click **⬇️ Download** to save the current image
6. Click the **list icon** to switch to grid view and browse 20 cats at a time — click any cat to view it full size
