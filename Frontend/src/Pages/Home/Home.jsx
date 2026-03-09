import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import PropertyType from "../../Components/PropertyType/PropertyType";
import FeaturedSales from "../../Components/FeaturedSales/FeaturedSales";
import Cities from "../../Components/Cities/Cities";
import FeaturedProperties from "../../Components/FeaturedProperties/FeaturedProperties";
import Stats from "../../Components/Stats/Stats";
import PromoCards from "../../Components/PromoCards/PromoCards";
import Partners from "../../Components/Partners/Partners";
import ClientReviews from "../../Components/ClientReviews/ClientReviews";
import Pricing from "../../Components/Pricing/Pricing";
import FAQ from "../../Components/FAQ/FAQ";
import BecomeAgent from "../../Components/BecomeAgent/BecomeAgent";
import Blog from "../../Components/Blog/Blog";

function Home() {
  return (
    <>
      <Breadcrumb />
      <HowItWorks />
      <PropertyType />
      <FeaturedSales />
      <Cities />
      <FeaturedProperties />
      <Stats />
      <PromoCards />
      <Partners />
      <ClientReviews />
      <Pricing />
      <FAQ />
      <BecomeAgent />
      <Blog />
    </>
  );
}

export default Home;