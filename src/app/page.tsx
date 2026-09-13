import { Hero } from "@/components/home/Hero";
import { Transformation } from "@/components/home/Transformation";
import { ExploreServices } from "@/components/home/ExploreServices";
import { ExploreRooms } from "@/components/home/ExploreRooms";
import { DesignYourRoom } from "@/components/home/DesignYourRoom";
import { ShowroomPreview } from "@/components/home/ShowroomPreview";
import { Projects } from "@/components/home/Projects";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CustomIdea } from "@/components/home/CustomIdea";
import { Reviews } from "@/components/home/Reviews";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Transformation />
      <ExploreServices />
      <ExploreRooms />
      <DesignYourRoom />
      <ShowroomPreview />
      <Projects />
      <HowItWorks />
      <CustomIdea />
      <Reviews />
      <FinalCTA />
    </>
  );
}
