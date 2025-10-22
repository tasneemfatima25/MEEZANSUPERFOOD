import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const Submenu = (props) => {
  const { product } = props.value;
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
        <div className="flex justify-between items-center">
          <div className="text-sm flex space-x-2">
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full" style={{
          }}>
            {/* Home Icon */}
            <div
              className="flex items-center space-x-2 cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={(e) => history.push("/")}
            >
              <svg
                className="w-5 h-5"
                style={{ color: '#708A58' }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span
                className="font-medium text-sm"
                style={{ color: '#666666' }}
                onMouseEnter={(e) => e.target.style.color = '#708A58'}
                onMouseLeave={(e) => e.target.style.color = '#666666'}
              >
                Home
              </span>
            </div>

            {/* Separator */}
            <svg
              className="w-4 h-4"
              style={{ color: '#D4A574' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

            {/* Current Product */}
            <span className="font-semibold text-sm truncate max-w-md" style={{ color: '#708A58' }}>
              {product}
            </span>
          </div>
          </div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

export default Submenu;
