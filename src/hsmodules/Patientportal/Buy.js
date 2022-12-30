import { useState } from 'react'
import Products from './components/Marketplace/products';


export default function Buy(){
  const [currentView, setCurrentView] = useState("buy");

  const handleGoBack = () => {
    setCurrentView("buy");
  };

  return(
    <div>
      {currentView === "buy" && (
        <Products handleGoBack={handleGoBack} />
      )}
    </div>
  )
}
