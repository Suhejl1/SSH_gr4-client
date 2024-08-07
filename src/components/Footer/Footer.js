import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import logo from "../../assets/circles.png";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Condition to check if the current path is either "/" or "/signup"
  const hideFooter = location.pathname === "/" || location.pathname === "/signup";

  // If hideFooter is true, return null to not render the Footer
  if (hideFooter) {
    return null;
  }

  return (
    <MDBFooter color="unique-color-dark" className="font-medium pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="text-center text-md-left mt-3 pb-3">
          <MDBCol md="3" lg="3" xl="4" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <img src={logo} alt="Book Store App" height="50px" />
              <strong>Book-IT</strong>
            </h6>
            <p>
              Book-IT is an online React web application where the customer can
              purchase books online. Through this book store the users can
              search for a book by its title and later can add to the shopping
              cart and finally purchase using credit card transaction.
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="2" lg="2" xl="2" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <strong>Products</strong>
            </h6>
            <p>
              <a href="#">Books</a>
            </p>
          </MDBCol>

          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="4" lg="3" xl="3" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <strong>Contact</strong>
            </h6>
            <p>
              <i className="fa fa-envelope mr-3" /> &nbsp;bookshop@gmail.com
            </p>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow className="d-flex align-items-center">
          <MDBCol md="16" lg="16">
            <p className="text-center text-md-left grey-text">
              &copy; {new Date().getFullYear()} Made by FIEK STUDENTS
            </p>
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;