/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {toast} from "bulma-toast";
import DocumentClass from "../Documentation/DocumentClass";

export default function InventorySetup() {
  return (
    <section className="section remPadTop">
      <DocumentClass />

      {/* <div className="level">
                <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Inventory Admin</span></div>
            </div>
            <div className="columns ">
                <div className="column is-9">
                <div class="tabs">
                        <ul>
                            <li class="is-active"><div>Store</div></li>
                            <li><div>Products</div></li>
                            <li><div>Suppliers</div></li>
                            <li><div>Documents</div></li>
                        </ul>
                    </div>
                    
                    <div class="field">
                        <p class="control has-icons-left  ">
                            <input class="input is-small sz2" type="text" placeholder="Search Inventory"  />
                            <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                            </span>
                        </p>
                       
                    </div>
                    
                            </div>
                <div className="column is-3 has-background-white">
                    right
                </div>
            </div>   */}
    </section>
  );
}
