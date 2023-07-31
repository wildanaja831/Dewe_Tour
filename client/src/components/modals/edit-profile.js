import { FileInput, Label, Modal } from "flowbite-react";
import { API } from "../../config/api";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";

const EditProfile = (props) => {
  const [previewProfile, setPreviewProfile] = useState(null);
  const [form, setForm] = useState({
    image: "",
  });
  const { image } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file" && e.target.name === "image") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewProfile(url);
    }
  };

  let { data: profile } = useQuery("profileEditCache", async () => {
    const response = await API.get("/myUser");
    return response.data.data;
  });

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", form.image[0], form.image[0].name);
      const response = await API.patch("/edit-user", formData);

      alert("Success Edit Profile");
      props.setOpenModal(undefined);
    } catch (error) {
      alert("Vailed Edit Profile");
      console.log(error);
    }
  });

  return (
    <>
      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Body>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <p className="text-center text-[25px] font-semibold">
              Edit Image Profile
            </p>
            <div className="my-4">
              <Label className="text-[18px]" htmlFor="image">
                Upload Image
              </Label>
              <FileInput
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
              />
            </div>
            <div className="h-[350px] w-[350px] m-auto my-4">
              {previewProfile ? (
                <img
                  className="h-full w-full object-cover rounded-md"
                  src={previewProfile}
                />
              ) : (
                <img
                  className="h-full w-full object-cover rounded-md"
                  src={profile?.image}
                />
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="me-4 px-6 py-2 bg-green-400 hover:bg-green-500 text-white rounded-md"
              >
                Update
              </button>
              <button
                className=" px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={() => props.setOpenModal(undefined)}
              >
                Close
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;
