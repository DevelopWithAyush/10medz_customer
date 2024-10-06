import React from 'react'

const Footer = () => {
    const handleEmailClick = () => {
        window.location.href = "mailto:founders@medobed.com";
    };
  return (
      <footer className=' mt-[150px]  py-12 border-t-[1px] border-solid border-[#FE6903] border-opacity-50 rounded-xl flex flex-col gap-5 md:flex-row items-center justify-between px-12 ' >
          <p className='text-[16px] text-gray-600 lg:text-left text-center'>10Medz <br />At L-2/605, Katara Hills, Bhopal 462043 (M. P.)</p>
          <p>
              Email for queries:{" "}
              <a href="mailto:founders@medobed.com" onClick={handleEmailClick}>
                  founders@medobed.com
              </a>
          </p>
      
    </footer>
  )
}

export default Footer
