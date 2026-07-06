import { useEffect, useState } from "react";

import {
  getAllPublications,
} from "../services/publicationService";

import PublicationTable from "../components/publications/PublicationTable";
import PublicationSearch from "../components/publications/PublicationSearch";
import PublicationModal from "../components/publications/PublicationModal";
import DeletePublicationModal from "../components/publications/DeletePublicationModal";

function Publications() {

  const [publications, setPublications] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedPublication, setSelectedPublication] =
    useState(null);

  const [deletePublicationId, setDeletePublicationId] =
    useState(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {

      const response =
        await getAllPublications();

      setPublications(response);

    } catch (error) {

      console.log(error);

    }
  };

  const filteredPublications =
    publications.filter((publication) => {

      const keyword =
        search.toLowerCase();

      return (

        publication.name
          .toLowerCase()
          .includes(keyword) ||

        publication.language
          .toLowerCase()
          .includes(keyword) ||

        publication.frequency
          .toLowerCase()
          .includes(keyword)

      );

    });

  const handleEdit = (publication) => {

    setSelectedPublication(publication);

    setShowModal(true);

  };

  const handleDelete = (id) => {

    setDeletePublicationId(id);

  };

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">

            Publications

          </h1>

          <p className="text-gray-500">

            Manage all publications

          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >

          + Add Publication

        </button>

      </div>

      <PublicationSearch
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <PublicationTable
        publications={filteredPublications}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (

        <PublicationModal

          publication={selectedPublication}

          onClose={() => {

            setShowModal(false);

            setSelectedPublication(null);

          }}

          onPublicationAdded={
            fetchPublications
          }

        />

      )}

      {deletePublicationId && (

        <DeletePublicationModal

          publicationId={deletePublicationId}

          onDeleted={fetchPublications}

          onClose={() =>
            setDeletePublicationId(null)
          }

        />

      )}

    </div>

  );

}

export default Publications;