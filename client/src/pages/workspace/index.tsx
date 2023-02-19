import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { BASE_API_URL } from "@/constants";

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ListIcon, AddIcon } from "../../components/icons";

import { ListBulletIcon } from "@heroicons/react/20/solid";
import { setWorkspaceList } from "@/slices/workspaceSlice";
import { SatelliteAlt } from "@mui/icons-material";
import { setUserInfo } from "@/slices/userSlice";

export interface Workspace {
  _id: string;
  title: string;
  key: string;
  description: string;
  members: any[];
  owner: any;
}

export interface Payload {
  workspaces: Workspace[];
}

export default function Workspace() {
  const headers = ["Name", "Key", "Role", "Total Members"];
  const socket = useSelector((state: RootState) => state.socket.socket);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user.user);
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspaceList
  );
  const config = {
    headers: headers,
    name: "Workspace",
    url: "workspace/create",
  };
  const workapceMenuItems = [
    { id: 1, label: "Manage Workspaces", icon: ListIcon, link: "/workspace" },
    {
      id: 2,
      label: "Create Workspace",
      icon: AddIcon,
      link: "/workspace/create",
    },
  ];
  const getWorspaces = async () => {
    axios
      .get<Payload>(BASE_API_URL + "/api/user/workspaces", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        if (response.data) {
          dispatch(setWorkspaceList(response.data.workspaces));
        }
      });
  };
  useEffect(() => {
    if (token) {
      getWorspaces();
    }
  }, [token]);

  useEffect(() => {
    if (user && socket) {
      socket.emit("joinRoom", { rooms: [user.email] });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      axios
        .get(BASE_API_URL + "/api/user/profile", {
          headers: {
            "auth-token": token,
          },
        })
        .then((response) => {
          dispatch(setUserInfo(response.data.profileDetails));
        });
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (notification) => {
        console.log(notification);
      });

      return () => {
        socket.off("notification");
      };
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar menuItems={workapceMenuItems}></Sidebar>
        <div className="h-[calc(100vh-4.1rem)] w-full">
          {/* <BreadCrumb paths={paths}></BreadCrumb> */}
          <p className="px-6 mt-10 text-2xl font-semibold text-gray-800">
            Workspaces
          </p>
          <p className="px-6 mt-10 text-xl text-gray-600">List of Workspaces</p>
          {workspaces && <Table config={config} data={workspaces}></Table>}
        </div>
      </div>
    </>
  );
}
