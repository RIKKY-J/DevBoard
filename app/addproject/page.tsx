import Link from "next/link";

export default function addproject() {
    return (
        <main>
            <h1>Add project details below</h1>
            <div className="card">
                <h2 className="card-title">Project</h2>
                <h3>Enter Name</h3>
                <input type="text" placeholder="name..."/>
                <h3>Total task</h3>
                <input  type="number" placeholder="taskcount..."/>
                <button  className="button">Submit</button>
            </div>
        </main>
    );
}