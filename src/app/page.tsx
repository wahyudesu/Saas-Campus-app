import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { HeroSection } from "@/components/landingpage/hero-section";
import PainCard from "@/components/landingpage/kotak";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CTASection from "@/components/landingpage/cta";

export default function DocumentStorage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className=" fixed top-0 left-0 w-full bg-white border-b-2 z-50 py-4">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-black-100">Campus app</h1>
          <ul className="flex space-x-6">
            <li className="hover:text-gray-400 cursor-pointer">Home</li>
            <li className="hover:text-gray-400 cursor-pointer">Features</li>
            <li className="hover:text-gray-400 cursor-pointer">Pricing</li>
            <li className="hover:text-gray-400 cursor-pointer">FAQ</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="">
        <HeroSection />
      </div>

      {/* Pain Points Section */}
      <div className=" bg-white">
        <div className="container mx-auto">
          <PainCard />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto md:max-w-[800px]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Pertanyaan seputar campus app</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it customizable?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Tailor it to your needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the pricing?</AccordionTrigger>
              <AccordionContent>
                Check out our pricing section for more details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto">
          <CTASection />
        </div>
      </div>

      {/* Footer Section */}
      <Footer container>
        <div className="">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <FooterBrand
                href="https://flowbite.com"
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Flowbite Logo"
                name="Flowbite"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 mb-4">
              <div>
                <FooterTitle title="about" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Flowbite</FooterLink>
                  <FooterLink href="#">Tailwind CSS</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Github</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between mt-6">
            <FooterCopyright href="#" by="Flowbite™" year={2022} />
            <div className="flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}
