import React from 'react';
export default function Pagination({perPage,total,paginate}){
    
    const PageNumbers=[];
    for(let i=1; i<=(Math.ceil(total/perPage)); i++)
    {
        PageNumbers.push(i);
    }
    return(
        <div className="container pt-5 ">
            <nav>
                <ul className="pagination justify-content-center pl-5">
                    {PageNumbers.map(number=>
                    <li key={number} className="page-item " >
                        <button onClick={() =>paginate(number)} className="page-link bg-primary text-white">{number}</button>
                    </li>
                     )
                     }
                </ul>
           </nav>
        </div>
    )
}