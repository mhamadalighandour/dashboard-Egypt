import useFetch from "../../Context/useFetch";
import { Border, ButtonApp, Container, Imports } from "../../components/index";
import Twitter from "../../images/twitter (3).png";
import Facebook from "../../images/facebook-square.png";
import Instagram from "../../images/instagram (8).png";
import Whatsapp from "../../images/whatsapp-square.png";
import Linkedin from "../../images/linkedin.png";
import Youtube from "../../images/download (7).png";
import Webside from "../../images/website-icon-png-transparent-29.jpg";
import { useEffect, useState } from "react";
import usePost from "../../Context/usePost";

const PublicInformation = () => {
  const [postData1, setPostData1] = useState({
    start_time: "",
    end_time: "",
  });
  const [postData3, setPostData3] = useState({
    twitter: "",
    facebook: "",
    whatsapp: "",
    instagram: "",
    linkedin: "",
    website_url: "",
    youtube_url: "",
  });
  const [postData2, setPostData2] = useState({
    text: "",
    first_phone: "",
    secound_phone: "",
    third_phone: "",
  });
  const { data, loading } = useFetch(`admin/site-info/general`);
  const { data: data2 } = useFetch(`admin/site-info/social`);
  const { data: data3 } = useFetch(`admin/site-info/medical-relief-info`);
  useEffect(() => {
    setPostData3({
      twitter: data2?.data.data.twitter,
      facebook: data2?.data.data.facebook,
      whatsapp: data2?.data.data.whatsapp,
      instagram: data2?.data.data.instagram,
      linkedin: data2?.data.data.linkedin,
      website_url: data2?.data.data.website_url,
      youtube_url: data2?.data.data.youtube_url,
    });
  }, [data2]);
  useEffect(() => {
    setPostData3({
      twitter: data2?.data.data.twitter,
      facebook: data2?.data.data.facebook,
      whatsapp: data2?.data.data.whatsapp,
      instagram: data2?.data.data.instagram,
      linkedin: data2?.data.data.linkedin,
      website_url: data2?.data.data.website_url,
      youtube_url: data2?.data.data.youtube_url,
    });
  }, [data2]);
  useEffect(() => {
    setPostData2({
      text: data3?.data.data.text,
      first_phone: data3?.data.data.first_phone,
      secound_phone: data3?.data.data.secound_phone,
      third_phone: data3?.data.data.third_phone,
    });
  }, [data3]);
  useEffect(() => {
    setPostData1({
      start_time: data?.data.data.start_time.substring(10, 20),
      end_time: data?.data.data.end_time.substring(10, 20),
    });
  }, [data]);

  const {
    postRe: postRe1,
    error: error1,
    loading: loading4,
  } = usePost("admin/site-info/general", {
    start_time: "2023-12-31" + " " + postData1.start_time + ":00",
    end_time: "2023-12-31" + " " + postData1.end_time + ":00",
  });
  const {
    postRe: postRe2,
    error: error2,
    loading: loading5,
  } = usePost("admin/site-info/medical-relief-info", { ...postData2 });
  const {
    postRe: postRe3,
    error: error3,
    loading: loading6,
  } = usePost("admin/site-info/social", {
    ...postData3,
  });
  return (
    <Container>
      {loading4 ? <div className="loading"></div> : ""}
      {loading5 ? <div className="loading"></div> : ""}
      {loading6 ? <div className="loading"></div> : ""}
      <Border>
        {loading ? (
          <div className="loading"></div>
        ) : (
          <div className="space-y-3">
            <h1 className="text-center font-semibold text-Brown ">
              معلومات عامة
            </h1>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : بداية الدوام</div>
              <div>{data?.data.data.start_time.substring(10,20).substring(-2,6)}</div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : نهاية الدوام</div>
              <div>{data?.data.data.end_time.substring(10, 20).substring(-2,6)}</div>
            </div>
            <h1 className="text-center font-semibold text-Brown">للتواصل</h1>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : twitter</div>
              <div>{data2?.data.data.twitter.substring(0, 70)}...</div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2 ">
              <div className="text-Brown"> : facebook </div>
              <div>{data2?.data.data.facebook.substring(0, 70)}... </div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : whatsapp </div>
              <div>{data2?.data.data.whatsapp.substring(0, 70)}... </div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : linkedin </div>
              <div>{data2?.data.data.linkedin.substring(0, 70)}... </div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : instagram </div>
              <div>{data2?.data.data.instagram.substring(0, 70)}... </div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : website</div>
              <div>{data2?.data.data.website_url.substring(0, 70)}... </div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : youtube</div>
              <div>{data2?.data.data.youtube_url.substring(0, 70)}... </div>
            </div>
            <h1 className="text-center font-semibold text-Brown ">
              معلومات طلبا ت الاستغاثة
            </h1>
            <div className="flex flex-row-reverse font-semibold gap-2 ">
              <div className="text-Brown flex items-start"> : النص</div>
              <div className=" max-sm:w-full text-end">
                {data3?.data.data.text}
              </div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : الرقم الأول</div>
              <div className="text-center">{data3?.data.data.first_phone}</div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2">
              <div className="text-Brown"> : الرقم الثاني</div>
              <div>{data3?.data.data.third_phone}</div>
            </div>
            <div className="flex flex-row-reverse font-semibold gap-2 items-center">
              <div className="text-Brown"> : الرقم الثالث</div>
              <div>{data3?.data.data.secound_phone}</div>
            </div>
          </div>
        )}
      </Border>
      <br />
      <Border>
        <div className="space-y-6">
          <div className="flex gap-2p-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData1.start_time}
              type="time"
              title=" : تحديد بداية الدوام"
              onChange={(e) => {
                setPostData1({ ...postData1, start_time: e.target.value });
              }}
            />
            <Imports
              type="time"
              value={postData1.end_time}
              title=" : تحديد نهاية الدوام"
              onChange={(e) => {
                setPostData1({ ...postData1, end_time: e.target.value });
              }}
            />
          </div>
          <div>{error1}</div>
          <div>
            <button
              onClick={postRe1}
              className=" mx-2 border border-Brown text-Brown font-semibold bg-white p-3  rounded-xl hover:bg-Brown hover:text-white transition-all"
            >
              <span className="px-10"> حفظ</span>
            </button>
          </div>
        </div>
      </Border>
      <br />
      <Border>
        <div className="p-4">
          <div className="flex justify-between flex-row-reverse flex-wrap gap-2 p-5 max-md:flex-col py-4">
            <InputContact
              value={postData3.twitter}
              img={Twitter}
              onChange={(e) => {
                setPostData3({ ...postData3, twitter: e.target.value });
              }}
            />
            <InputContact
              value={postData3.facebook}
              img={Facebook}
              onChange={(e) => {
                setPostData3({ ...postData3, facebook: e.target.value });
              }}
            />
            <InputContact
              value={postData3.whatsapp}
              img={Whatsapp}
              onChange={(e) => {
                setPostData3({ ...postData3, whatsapp: e.target.value });
              }}
            />
            <InputContact
              value={postData3.instagram}
              img={Instagram}
              onChange={(e) => {
                setPostData3({ ...postData3, instagram: e.target.value });
              }}
            />
            <InputContact
              value={postData3.linkedin}
              img={Linkedin}
              onChange={(e) => {
                setPostData3({ ...postData3, linkedin: e.target.value });
              }}
            />
            <InputContact
              value={postData3.website_url}
              img={Webside}
              alt={"website"}
              onChange={(e) => {
                setPostData3({ ...postData3, website_url: e.target.value });
              }}
            />
            <InputContact
              img={Youtube}
              alt={"youtube"}
              value={postData3.youtube_url}
              onChange={(e) => {
                setPostData3({ ...postData3, youtube_url: e.target.value });
              }}
            />
          </div>
        </div>
        <div>{error3}</div>
        <button
          onClick={postRe3}
          className=" mx-2 border border-Brown text-Brown font-semibold bg-white p-3  rounded-xl hover:bg-Brown hover:text-white transition-all"
        >
          <span className="px-10"> حفظ</span>
        </button>
      </Border>
      <br />
      <Border>
        <div className="flex max-sm:flex-col py-5">
          <Imports
            value={postData2.secound_phone}
            title=" : الرقم الثالث"
            onChange={(e) => {
              setPostData2({ ...postData2, secound_phone: e.target.value });
            }}
          />
          <Imports
            value={postData2.third_phone}
            title=" : الرقم الثاني"
            onChange={(e) => {
              setPostData2({ ...postData2, third_phone: e.target.value });
            }}
          />
          <Imports
            value={postData2.first_phone}
            title=" :الرقم الأول "
            onChange={(e) => {
              setPostData2({ ...postData2, first_phone: e.target.value });
            }}
          />
        </div>
        <textarea
          value={postData2.text}
          className="w-full outline-none p-4 text-end border-b border-Brown"
          placeholder=":النص"
          onChange={(e) => {
            setPostData2({ ...postData2, text: e.target.value });
          }}
        ></textarea>
        <div>{error2}</div>
        <button
          onClick={postRe2}
          className=" mx-2 border border-Brown text-Brown font-semibold bg-white p-3  rounded-xl hover:bg-Brown hover:text-white transition-all"
        >
          <span className="px-10"> حفظ</span>
        </button>
      </Border>
    </Container>
  );
};

export default PublicInformation;

const InputContact = (props) => {
  return (
    <div className="flex max-sm:flex-col-reverse space-x-3 w-[40%] max-md:mx-auto max-md:w-[100%]">
      <input
        value={props.value}
        onChange={props.onChange}
        type="url"
        className="bg-[#D5D5D5] block outline-none py-2 px-5 flex-1 rounded-lg placeholder:text-end placeholder:font-semibold"
        placeholder="ادخل الرابط"
      />
      <img src={props.img} alt={props.alt} className="block w-10 h-10" />
    </div>
  );
};
