import { useQuery } from "react-query";
import Content from "../components/content";
import Hero from "../components/hero";
import { NavbarHome } from "../components/navbar";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import Content1 from "../assets/images/guarantee-content1.png";
import Content2 from "../assets/images/heart-content2.png";
import Content3 from "../assets/images/agent-content3.png";
import Content4 from "../assets/images/support-content4.png";
import Bg1 from "../assets/images/hibiscus-bg.png";
import Bg2 from "../assets/images/palm-bg.png";

const Home = () => {
  const [form, setForm] = useState({
    country: "",
  });
  const [isSearch, setIsSearch] = useState(false);

  const handleSubmitSearchTicket = (data) => {
    setForm(data);
    setIsSearch(true);
  };

  const handleSubmitEmpty = (data) => {
    setForm(data);
    setIsSearch(false);
  };

  let { data: trips, refetch } = useQuery("tripsCache", async () => {
    const response = isSearch
      ? await API.get(`/trip?country=${form.country}`)
      : await API.get("/trips");
    return response.data.data;
  });

  useEffect(() => {
    refetch();
  }, [isSearch, form]);

  return (
    <div style={{ fontFamily: "" }}>
      <div className="bg-hero-bg bg-cover">
        <NavbarHome />
        <Hero
          submitData={handleSubmitSearchTicket}
          emptyData={handleSubmitEmpty}
        />
      </div>
      <div className="sm:py-12 sm:px-24 bg-white relative">
        <img className="absolute right-0 -top-10 w-[100px]" src={Bg1} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 absolute -top-10 me-32 ms-6">
          <div className="px-8 py-20 text-center bg-white shadow-lg rounded-md">
            <img className="m-auto" src={Content1} />
            <p className="mt-4 mb-2 font-semibold text-[20px]">
              Best Price Guarantee
            </p>
            <p>A small river named Duren flows by their place and supplies</p>
          </div>
          <div className="px-8 py-20 text-center bg-white shadow-lg rounded-md">
            <img className="m-auto" src={Content2} />
            <p className="mt-4 mb-2 font-semibold text-[20px]">
              Travellers Love Us
            </p>
            <p>A small river named Duren flows by their place and supplies</p>
          </div>
          <div className="px-8 py-20 text-center bg-white shadow-lg rounded-md">
            <img className="m-auto" src={Content3} />
            <p className="mt-4 mb-2 font-semibold text-[20px]">
              Best Travel Agent
            </p>
            <p>A small river named Duren flows by their place and supplies</p>
          </div>
          <div className="px-8 py-20 text-center bg-white shadow-lg rounded-md">
            <img className="m-auto" src={Content4} />
            <p className="mt-4 mb-2 font-semibold text-[20px]">
              Our Dedicated Support
            </p>
            <p>A small river named Duren flows by their place and supplies</p>
          </div>
        </div>
        <img className="absolute left-0 top-[400px] w-[100px]" src={Bg2} />
        <div className="text-center pt-[1600px] md:pt-[850px] lg:pt-[450px]">
          <p className="mb-20 font-semibold text-[40px]">Group Tour</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 text-start">
            {trips?.map((data) => {
              return (
                <Content
                  id={data?.id}
                  image={data?.image}
                  title={data?.title}
                  quota={data?.quota}
                  price={data?.price}
                  country={data?.country.name}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative mt-12">
        <footer className="py-2 text-center bg-[#FFAF00] mt-auto text-white">
          Copyright @ 2020 Dewe Tour - Muhammad Wildan Firdaus - NIS. All Rights
          reserved
        </footer>
      </div>
    </div>
  );
};

export default Home;
