import Content1 from "../assets/images/guarantee-content1.png";
import Content2 from "../assets/images/heart-content2.png";
import Content3 from "../assets/images/agent-content3.png";
import Content4 from "../assets/images/support-content4.png";
import Bg1 from "../assets/images/hibiscus-bg.png";
import Bg2 from "../assets/images/palm-bg.png";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

const Content = (props) => {
  const navigate = useNavigate();

  const handleDetail = async (id) => {
    try {
      const response = await API.get(`/trip/${id}`);
      navigate(`/trip/${id}`);
      return response.data.data;
    } catch (error) {
      console.log("Ini Error Ke Payment", error);
    }
  };

  return (
    <div>
      <div
        key={props.id}
        onClick={() => handleDetail(props.id)}
        className="p-2 rounded-md shadow-lg relative hover:border-yellow-300 border-2 border-white hover:cursor-pointer"
      >
        <div>
          <img className="w-full rounded-md object-cover" src={props.image} />
          <p className="px-3 py-2 bg-white absolute rounded-l-md right-[8px] top-[30px]">
            10/{props.quota}
          </p>
        </div>
        <p className="text-[18px] mt-4 mb-2 truncate px-2">{props.title}</p>
        <div className="flex justify-between px-2">
          <p className="text-[#FFAF00] font-semibold">IDR. {props.price}</p>
          <p className="text-[#878787] font-semibold">{props.country}</p>
        </div>
      </div>
    </div>
  );
};

export default Content;
