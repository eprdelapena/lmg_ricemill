"use client";

import useV1GetAdmin from "@/hooks/api_hooks/usev1getadmin";
import { TParamsPostOrders, TUserSession } from "@/schema/main_schema";
import React, { useEffect, useState } from "react";
import CAddAdminModal from "./cadmin_addadminmodal";
import useV1DeleteUser from "@/hooks/api_hooks/usev1deleteuser";
import CEditAdminModal from "./cadmin_changestatus";

const CAdminTable = (props: { userData: TUserSession }) => {
  const { userData } = props;
  const [addAdminModal, setAddAdminModal] = useState<boolean>(false);
  const [editAdminModal, setEditAdminModal] = useState<boolean>(false);

  const {
    adminList,
    setAdminList,
    currentSkip,
    setCurrentSkip,
    getV1GetAdmin,
  } = useV1GetAdmin();

  const { getV1DeleteUser } = useV1DeleteUser();

  useEffect(() => {
    getV1GetAdmin();
  }, []);
  return (
    <>
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl text-black font-bold mb-4">Admin list</h2>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-4 ">
          <button
            className="border rounded-lg p-2 w-full md:w-auto bg-blue-500 text-white cursor-pointer"
            onClick={() => {
              setAddAdminModal(true);
            }}
          >
            Add admin
          </button>
        </div>

        <div className="mb-5">
          <p className="text-black"> Role explanation: </p>
          <p className="text-black">
            {" "}
            <span className="text-green-500">(Admin)</span> priveleges: Add,
            Edit, Delete, View expenses and income, Regulate admin users{" "}
          </p>
          <p className="text-black">
            {" "}
            <span className="text-blue-500">(Admin Secretary)</span> priveleges:
            Add, Edit, Delete, View expenses and income
          </p>
          <p className="text-black">
            {" "}
            <span className="text-violet-500">(Admin Viewer)</span> priveleges:
            View users, View expenses and income
          </p>
          <p className="text-black">
            {" "}
            <span className="text-red-500">(Admin Level One)</span> priveleges:
            Add actions
          </p>
          <p className="text-black">
            {" "}
            <span className="text-orange-500">(Admin Level Two)</span>{" "}
            priveleges: Add and edit actions
          </p>
          <p className="text-black">
            {" "}
            <span className="text-gray-500">(Admin Level Three)</span>{" "}
            priveleges: Add, edit, and delete, actions
          </p>
        </div>
        {/* HORIZONTAL SCROLL CONTAINER */}
        <div className="w-full overflow-x-auto whitespace-nowrap ">
          <table className="table-auto  bg-white shadow-md rounded-lg w-full ">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "Delete",
                  "Edit role",
                  "Account type",
                  "username",
                  "full name",
                  "mobile",
                  "IP Address",
                  "Location",
                  "Device used",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className="py-2 px-4 text-center text-black whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminList.length > 0 ? (
                adminList.map((admin, index) => {
                  return (
                    <tr key={index} className="border-t">
                      <td
                        className="py-2 px-4 text-red-500 text-center cursor-pointer whitespace-nowrap"
                        onClick={() => {
                          getV1DeleteUser(
                            { username: admin.username },
                            getV1GetAdmin,
                          );
                        }}
                      >
                        Delete account
                      </td>
                      <td
                        className="py-2 px-4 text-blue-500 text-center cursor-pointer whitespace-nowrap"
                        onClick={() => {
                          setEditAdminModal(true);
                        }}
                      >
                        Edit role
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {admin.eaccounttype}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {admin.username}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {admin.firstname} {admin.middlename} {admin.lastname}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {admin.mobile}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {admin.lastip}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {admin.lastlocation}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {admin.lastdevice}
                      </td>
                      {editAdminModal && (
                        <CEditAdminModal
                          admin={admin}
                          getV1GetAdmin={getV1GetAdmin}
                          setEditAdminModal={setEditAdminModal}
                        />
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr className="border-t">
                  <td
                    className="py-2 px-4 text-black text-center whitespace-nowrap"
                    colSpan={100}
                  >
                    No current data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addAdminModal && <CAddAdminModal setAddAdminModal={setAddAdminModal} />}
    </>
  );
};

export default CAdminTable;
