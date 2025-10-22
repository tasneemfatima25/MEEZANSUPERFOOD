import React, { Fragment, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Alert, reviewSubmitHanlder } from "./Action";
import { LayoutContext } from "../layout";
import { isAuthenticate } from "../auth/fetchApi";
import { getSingleProduct } from "./FetchApi";

const ReviewForm = (props) => {
  const { data, dispatch } = useContext(LayoutContext);
  let { id } = useParams(); // Product Id

  const [fData, setFdata] = useState({
    rating: "",
    review: "",
    error: false,
    success: false,
    pId: id,
  });

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, error: false, success: false });
    }, 3000);
  }

  const fetchData = async () => {
    try {
      let responseData = await getSingleProduct(id);
      if (responseData.Product) {
        dispatch({
          type: "singleProductDetail",
          payload: responseData.Product,
        });
        console.log(data);
      }
      if (responseData.error) {
        console.log(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ratingUserList = data.singleProductDetail.pRatingsReviews.map(
    (item) => {
      return item.user ? item.user._id : "";
    }
  );

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col">
        {fData.error ? Alert("red", fData.error) : ""}
        {fData.success ? Alert("green", fData.success) : ""}
      </div>
      {ratingUserList.includes(isAuthenticate().user._id) ? (
        <div className="mb-12"></div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 md:px-12 mb-12">
          <div className="p-8 rounded-3xl" style={{
            background: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            {/* Top Colored Line */}
            <div style={{
              height: '6px',
              background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
              marginBottom: '32px',
              borderRadius: '3px'
            }}></div>

            <div className="flex flex-col space-y-3 mb-6">
              <h3 className="text-3xl font-bold" style={{ color: '#2C2C2C', fontFamily: 'Georgia, serif' }}>
                Add a Review
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Your email address will not be published. Required fields are marked *
              </p>
            </div>

            {/* Input Rating */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3" style={{ color: '#2C2C2C' }}>
                Your Rating <span style={{ color: '#D4A574' }}>*</span>
              </label>
              <fieldset
                onChange={(e) => setFdata({ ...fData, rating: e.target.value })}
                className="rating"
              >
                <input
                  type="radio"
                  className="rating"
                  id="star5"
                  name="rating"
                  defaultValue={5}
                />
                <label
                  className="full"
                  htmlFor="star5"
                  title="Awesome - 5 stars"
                />
                <input
                  type="radio"
                  className="rating"
                  id="star4"
                  name="rating"
                  defaultValue={4}
                />
                <label
                  className="full"
                  htmlFor="star4"
                  title="Pretty good - 4 stars"
                />
                <input
                  type="radio"
                  className="rating"
                  id="star3"
                  name="rating"
                  defaultValue={3}
                />
                <label
                  className="full"
                  htmlFor="star3"
                  title="Meh - 3 stars"
                />
                <input
                  type="radio"
                  className="rating"
                  id="star2"
                  name="rating"
                  defaultValue={2}
                />
                <label
                  className="full"
                  htmlFor="star2"
                  title="Kinda bad - 2 stars"
                />
                <input
                  type="radio"
                  className="rating"
                  id="star1"
                  name="rating"
                  defaultValue={1}
                />
                <label
                  className="full"
                  htmlFor="star1"
                  title="Sucks big time - 1 star"
                />
              </fieldset>
            </div>

            {/* Review Form */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="textArea" className="text-lg font-semibold mb-2" style={{ color: '#2C2C2C' }}>
                  Your Review <span style={{ color: '#D4A574' }}>*</span>
                </label>
                <textarea
                  onChange={(e) => setFdata({ ...fData, review: e.target.value })}
                  value={fData.review}
                  className="px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                  style={{
                    border: '2px solid rgba(112, 138, 88, 0.3)',
                    color: '#2C2C2C',
                    background: '#FAFAFA'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#708A58'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(112, 138, 88, 0.3)'}
                  name="textArea"
                  id="textArea"
                  cols={30}
                  rows={5}
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button
                onClick={(e) => reviewSubmitHanlder(fData, setFdata, fetchData)}
                className="px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: '#708A58',
                  boxShadow: '0 4px 15px rgba(168,197,160,0.4)'
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ReviewForm;
