import React, { useState } from 'react'
import Header from './Header'
import Home from './Home'

const App: React.FC = () => {
  
  //Array of default color
  const defaultColors: Array<string> = [
    "#F39C12", "#F1C40F", "#ECF0F1", "#E74C3C", "#E67E22", "#D35400", "#C0392B", "#BDC3C7", "#9B59B6",
    "#95A5A6", "#8E44AD", "#7F8C8D", "#3498DB", "#34495E", "#2ECC71", "#2C3E50", "#2980B9", "#27AE60",
    "#1ABC9C","#16A085"
  ]

  //STATE colorList for save the color
  const [colorList, setColorList] = useState<Array<string>>(defaultColors)

  return (
    <div className="App">
      {/* Header send properties coloList & setColorList */}
      <Header colorList={colorList} setColorList={setColorList} />

      {/* Home send properties coloList, setColorList & defaultColors */}
      <Home colorList={colorList} defaultColors={defaultColors} setColorList={setColorList} />
    </div>
  );
}

export default App;


// There is Button close Bugs when do filtering checkbox
// The close Button will appear in some checkbox filter if the cheeckbox is true 
// *location file in Home.tsx

// I haven't found a way to solve it yet due to limited time