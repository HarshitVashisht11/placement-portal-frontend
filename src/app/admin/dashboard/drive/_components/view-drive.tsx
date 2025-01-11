"use client";

import ViewDrivePage from "@/components/ViewDrivePage";
import { auth_api } from "@/lib/api";
import { Branch } from "@/schemas/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DrivePage = () => {
  const { drive_id } = useParams();
  const [drivedata, setDrivedata] = useState<DriveView>();
  async function GetDriveData() {
    try {
      const response = await auth_api.get("/user/drive/" + drive_id);

      //* Refactor this to do this logic in backend
      //* as this is not a good practice to do this in frontend, frontend should only be responsible for rendering not for logic
      const data = response.data.Data;

      let allowed_branches : Branch[] = [];
      if (data.cse_allowed) allowed_branches.push(Branch.CSE);
      if (data.ece_allowed) allowed_branches.push(Branch.ECE);
      if (data.mech_allowed) allowed_branches.push(Branch.MECH);
      if (data.civ_allowed) allowed_branches.push(Branch.CIVIL);

      setDrivedata({
        ...data,
        allowed_branches,
      });
      // setDrivedata(response.data.Data);
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    GetDriveData();
  }, []);

  if (!drivedata) {
    return <div>Loading...</div>;
  }

  return <ViewDrivePage driveData={drivedata} />;
};

export default DrivePage;
