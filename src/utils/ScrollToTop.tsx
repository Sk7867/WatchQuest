import { useEffect } from "react";
import { useLocation } from "react-use";


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page when the pathname changes
    return () => { }
  }, [pathname])

  return null; // This component does not render anything
}

export default ScrollToTop