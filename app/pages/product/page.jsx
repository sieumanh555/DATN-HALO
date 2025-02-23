"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchComponent from "../../components/search"
import DropDown from "../../components/dropDown"

export default function Cart() {

  return (
    <div className="min-h-[1000px] w-full flex gap-[2%]">
      <div className="w-[29%] bg-slate-400">
        <div className="w-[100px] text-gray-900 flex gap-5">
          <FontAwesomeIcon icon={faListCheck} />
          <h2>Danh mục</h2>
        </div>
      </div>
      <div className="w-[69%] bg-red-400">
        <div className="text-gray-200 bg-slate-500 flex h-[100px] items-center">
          <div className="w-[10%]">
            <span className="text-[28px]">Sắp xếp</span>
          </div>
          <div  className="w-[20%]">
              <DropDown/>
          </div>
          <div  className="w-[20%]">
              <DropDown/>
          </div>
          <div  className="w-[50%] bg-slate-200 pl-[140px]">
            <SearchComponent/>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
