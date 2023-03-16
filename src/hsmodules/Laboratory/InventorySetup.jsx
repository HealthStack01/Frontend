/* eslint-disable */
import React from 'react'

export default function InventorySetup() {
    return (
        <section className= "section remPadTop">
            <div className="level">
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
                            <input class="input is-small sz2" type="text" placeholder="Search Inventory" />
                            <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                            </span>
                        </p>
                    </div>
                    <div class="table-container">
                    
                            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                    <th><abbr title="S/No">S/No</abbr></th>
                                    <th>Product</th>
                                    <th><abbr title="Quantity">Qtty</abbr></th>
                                    <th><abbr title="Unit">Unit</abbr></th>
                                    <th><abbr title="Cost Price">CP</abbr></th>
                                    <th><abbr title="Selling Price">SP</abbr></th>
                                    <th><abbr title="Stock">Stock Amount</abbr></th>
                                    <th><abbr title="Reorder Level">Reorder</abbr></th>
                                    <th><abbr title="Expiry">Expiry</abbr></th>
                                    <th><abbr title="Actions">Actions</abbr></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    
                                </tfoot>
                                <tbody>
                                    <tr>
                                    <th>1</th>
                                    <td>Tab Omiprazole (Evans)</td>
                                    <td>3000</td>
                                    <td>packets</td>
                                    <td>12.00</td>
                                    <td>315.00</td>
                                    <td>6,000</td>
                                    <td>30</td>
                                    <td>-</td>
                                    <td><span className="showAction">...</span></td>
                                   
                                    </tr>
                                    <tr>
                                    <th>2</th>
                                    <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
                                    <td>38</td>
                                    <td>20</td>
                                    <td>11</td>
                                    <td>7</td>
                                    <td>65</td>
                                    <td>36</td>
                                    <td>+29</td>
                                    <td>71</td>
                                    
                                    </tr>
                                    <tr>
                                    <th>3</th>
                                    <td><a href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C." title="Tottenham Hotspur F.C.">Tottenham Hotspur</a></td>
                                    <td>38</td>
                                    <td>19</td>
                                    <td>13</td>
                                    <td>6</td>
                                    <td>69</td>
                                    <td>35</td>
                                    <td>+34</td>
                                    <td>70</td>
                                    
                                    </tr>
                                    <tr class="is-selected">
                                    <th>4</th>
                                    <td><a href="https://en.wikipedia.org/wiki/Manchester_City_F.C." title="Manchester City F.C.">Manchester City</a></td>
                                    <td>38</td>
                                    <td>19</td>
                                    <td>9</td>
                                    <td>10</td>
                                    <td>71</td>
                                    <td>41</td>
                                    <td>+30</td>
                                    <td>66</td>
                                    
                                    </tr>
                                    <tr>
                                    <th>5</th>
                                    <td><a href="https://en.wikipedia.org/wiki/Manchester_United_F.C." title="Manchester United F.C.">Manchester United</a></td>
                                    <td>38</td>
                                    <td>19</td>
                                    <td>9</td>
                                    <td>10</td>
                                    <td>49</td>
                                    <td>35</td>
                                    <td>+14</td>
                                    <td>66</td>
                                   
                                    </tr>
                                    <tr>
                                    <th>6</th>
                                    <td><a href="https://en.wikipedia.org/wiki/Southampton_F.C." title="Southampton F.C.">Southampton</a></td>
                                    <td>38</td>
                                    <td>18</td>
                                    <td>9</td>
                                    <td>11</td>
                                    <td>59</td>
                                    <td>41</td>
                                    <td>+18</td>
                                    <td>63</td>
                                    
                                    </tr>
                                    <tr>
                                    <th>7</th>
                                    <td><a href="https://en.wikipedia.org/wiki/West_Ham_United_F.C." title="West Ham United F.C.">West Ham United</a></td>
                                    <td>38</td>
                                    <td>16</td>
                                    <td>14</td>
                                    <td>8</td>
                                    <td>65</td>
                                    <td>51</td>
                                    <td>+14</td>
                                    <td>62</td>
                                    
                                    </tr>
                                    <tr>
                                    <th>8</th>
                                    <td><a href="https://en.wikipedia.org/wiki/Liverpool_F.C." title="Liverpool F.C.">Liverpool</a></td>
                                    <td>38</td>
                                    <td>16</td>
                                    <td>12</td>
                                    <td>10</td>
                                    <td>63</td>
                                    <td>50</td>
                                    <td>+13</td>
                                    <td>60</td>

                                    </tr>
                                    <tr>
                                    <th>9</th>
                                    <td><a href="https://en.wikipedia.org/wiki/Stoke_City_F.C." title="Stoke City F.C.">Stoke City</a></td>
                                    <td>38</td>
                                    <td>14</td>
                                    <td>9</td>
                                    <td>15</td>
                                    <td>41</td>
                                    <td>55</td>
                                    <td>−14</td>
                                    <td>51</td>
                                   
                                    </tr>
                                    
                                </tbody>
                                </table>
                                
                            </div>
                            </div>
                <div className="column is-3 has-background-white">
                    right
                </div>
            </div>                            
        </section>
    )
}
