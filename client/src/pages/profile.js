import { Navbars } from "../components/navbar";
import ProfileItem from "../components/profile-item";

const Profile = () => {
  return (
    <div>
      <Navbars />
      <ProfileItem />
      <footer className="py-2 text-center bg-[#FFAF00] mt-auto text-white">
        Copyright @ 2020 Dewe Tour - Muhammad Wildan Firdaus - NIS. All Rights
        reserved
      </footer>
    </div>
  );
};

export default Profile;
