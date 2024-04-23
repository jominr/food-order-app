import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      {/* container mx-auto: Leave space on the left and right sides */}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
    </div>
  );
};

export default Layout;