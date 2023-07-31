import { FileInput, Label, TextInput, Textarea } from "flowbite-react";
import { Navbars } from "../../components/navbar";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewTrip = () => {
  const [previewTrip, setPreviewTrip] = useState(null);
  const [form, setForm] = useState({
    title: "",
    country_id: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: "",
    quota: "",
    description: "",
    image: "",
  });

  let { data: countries } = useQuery("countriesListCache", async () => {
    const response = await API.get("/country");
    return response.data.data;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file" && e.target.name === "image") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewTrip(url);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("country_id", form.country_id);
      formData.set("accomodation", form.accomodation);
      formData.set("transportation", form.transportation);
      formData.set("eat", form.eat);
      formData.set("day", form.day);
      formData.set("night", form.night);
      formData.set("dateTrip", form.dateTrip);
      formData.set("price", form.price);
      formData.set("quota", form.quota);
      formData.set("description", form.description);
      formData.set("image", form.image[0], form.image[0].name);

      const response = await API.post("/trip", formData);
      console.log("Create ticket success", response);

      setForm({
        title: "",
        country_id: "",
        accomodation: "",
        transportation: "",
        eat: "",
        day: "",
        night: "",
        dateTrip: "",
        price: "",
        quota: "",
        description: "",
        image: "",
      });
      alert("Add New Trip Success!!");
      navigate("/trip");
    } catch (err) {
      console.log(form);
      console.log("Create Trip failed : ", err);
    }
  });

  return (
    <div>
      <Navbars />
      <div className="w-4/5 m-auto mb-24 mt-16">
        <p className="text-[22px] font-semibold">Add Trip</p>
        <div className="mx-8 my-8">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit.mutate(e)}
          >
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="title">
                  Title Trip
                </label>
              </div>
              <TextInput
                onChange={handleChange}
                name="title"
                id="title"
                required
                shadow
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="password">
                  Country
                </label>
              </div>
              <select
                onChange={handleChange}
                name="country_id"
                className="w-full rounded-md border-gray-300 text-gray-500"
                required
              >
                <option value="" hidden>
                  Country
                </option>
                {countries?.map((data) => {
                  return (
                    <option key={data?.id} value={data?.id} className="py-8">
                      {data?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="accomodation">
                  Accomodation
                </label>
              </div>
              <TextInput
                onChange={handleChange}
                name="accomodation"
                id="accomodation"
                required
                shadow
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="trasportation">
                  Transportation
                </label>
              </div>
              <TextInput
                onChange={handleChange}
                name="transportation"
                id="trasportation"
                required
                shadow
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="eat">
                  Eat
                </label>
              </div>
              <TextInput
                onChange={handleChange}
                name="eat"
                id="eat"
                required
                shadow
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="duration">
                  Duration
                </label>
              </div>
              <div className="flex">
                <div className="flex items-center me-4">
                  <TextInput
                    onChange={handleChange}
                    name="day"
                    id="duration"
                    className="me-4"
                    required
                    shadow
                    type="number"
                  />{" "}
                  Day
                </div>
                <div className="flex items-center">
                  <TextInput
                    onChange={handleChange}
                    name="night"
                    id="duration1"
                    className="me-4"
                    required
                    shadow
                    type="number"
                  />{" "}
                  Night
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="date">
                  Date Trip
                </label>
              </div>
              <TextInput
                onChange={handleChange}
                name="dateTrip"
                id="date"
                required
                shadow
                type="date"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="price">
                  Price
                </label>
              </div>
              <TextInput
                onChange={handleChange}
                name="price"
                id="price"
                required
                shadow
                type="number"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="quota">
                  Quota
                </label>
              </div>
              <TextInput
                onChange={handleChange}
                name="quota"
                id="quota"
                required
                shadow
                type="number"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="desc">
                  Description
                </label>
              </div>
              <Textarea
                onChange={handleChange}
                name="description"
                rows={3}
                className="resize-none"
                id="desc"
                required
                shadow
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label className="font-semibold" htmlFor="desc">
                  Upload Image
                </label>
              </div>
              <div className="my-4">
                <img
                  className="w-[200px] h-[200px] object-cover rounded-md shadow-md "
                  src={previewTrip}
                />
              </div>
              <FileInput onChange={handleChange} name="image" type="file" />
            </div>
            <button
              type="submit"
              className="bg-[#FFAF00] hover:bg-yellow-300 px-6 py-2 rounded-md w-1/4 m-auto text-white mt-8"
            >
              Add Trip
            </button>
          </form>
        </div>
      </div>
      <footer className="py-2 text-center bg-[#FFAF00] text-white">
        Copyright @ 2020 Dewe Tour - Muhammad Wildan Firdaus - NIS. All Rights
        reserved
      </footer>
    </div>
  );
};

export default AddNewTrip;
