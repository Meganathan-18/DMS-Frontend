// import React from "react";
// import { getFolderTrash, restoreFolder } from "../../api/folderService";

// class FolderTrash extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       folders: [],
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     this.loadTrash();
//   }

//   loadTrash = async () => {
//     try {
//       const res = await getFolderTrash();
//       this.setState({ folders: res.data, loading: false });
//     } catch (err) {
//       console.error("Failed to load folder trash", err);
//       this.setState({ loading: false });
//     }
//   };

//   daysLeft = (deletedAt) => {
//     const expiry = new Date(deletedAt);
//     expiry.setDate(expiry.getDate() + 30);
//     return Math.max(
//       0,
//       Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24))
//     );
//   };

//   handleRestore = async (id) => {
//     try {
//       await restoreFolder(id);
//       this.loadTrash();
//     } catch {
//       alert("Failed to restore folder");
//     }
//   };

//   render() {
//     const { folders, loading } = this.state;

//     if (loading) return <p>Loading...</p>;

//     return (
//       <div style={{ padding: "20px" }}>
//         <h2>🗑 Folder Trash</h2>

//         {folders.length === 0 ? (
//           <p>No folders in trash</p>
//         ) : (
//           folders.map((f) => (
//             <div key={f.id} className="trash-card">
//               <div>
//                 📁 <strong>{f.name}</strong>
//                 <div style={{ fontSize: "13px", color: "#64748b" }}>
//                   ⏳ {this.daysLeft(f.deletedAt)} days left
//                 </div>
//               </div>

//               <button
//                 onClick={() => this.handleRestore(f.id)}
//                 style={{
//                   background: "#dcfce7",
//                   color: "#166534",
//                   borderRadius: "8px",
//                   padding: "6px 12px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 ♻ Restore
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     );
//   }
// }

// export default FolderTrash;
