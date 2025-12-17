import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopupForm from "@/components/PopupForm";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import WebDevelopment from "@/pages/services/WebDevelopment";
import MobileDevelopment from "@/pages/services/MobileDevelopment";
import IoTSolutions from "@/pages/services/IoTSolutions";
import AIAndData from "@/pages/services/AIAndData";
import CloudDevOps from "@/pages/services/CloudDevOps";
import ConsultingStrategy from "@/pages/services/ConsultingStrategy";
import InvoiceInventorySuite from "@/pages/services/InvoiceInventorySuite";
import InvoiceInventoryProduct from "@/pages/products/InvoiceInventorySuite";
import SowsiMeet from "@/pages/products/SowsiMeet";
import Careers from "@/pages/Careers";
import JobApplication from "@/pages/JobApplication";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/web-development" component={WebDevelopment} />
      <Route path="/services/mobile-development" component={MobileDevelopment} />
      <Route path="/services/iot-solutions" component={IoTSolutions} />
      <Route path="/services/ai-data" component={AIAndData} />
      <Route path="/services/cloud-devops" component={CloudDevOps} />
      <Route path="/services/consulting-strategy" component={ConsultingStrategy} />
      <Route path="/services/invoice-inventory-suite" component={InvoiceInventorySuite} />
      <Route path="/products" component={Products} />
      <Route path="/products/invoice-inventory-suite" component={InvoiceInventoryProduct} />
      <Route path="/products/sowsi-meet" component={SowsiMeet} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      <Route path="/careers/apply/:jobId" component={JobApplication} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 30000);

    return () => clearTimeout(popupTimer);
  }, []);

  const handleClosePopup=() =>{
    setShowPopup(false)

    setTimeout(() => {
      setShowPopup(true);
    }, 30000);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Navbar />
        <Router />
        <Footer />
        {showPopup && <PopupForm onClose={handleClosePopup} />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
