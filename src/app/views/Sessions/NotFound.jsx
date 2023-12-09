import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NotFound() {
  const history = useHistory();
  return (
    <div className="flex flex-center flex-middle w-100 h-100vh">
      <div className="flex flex-column flex-center flex-middle" style={{ maxWidth: "320px" }}>
        <img className="mb-32" src="/assets/images/illustrations/404.svg" alt="" />
        <Button
          className="capitalize"
          variant="contained"
          color="primary"
          onClick={() => history.push("/dashboard/analytics")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;