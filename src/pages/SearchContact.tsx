import {
  NeutralColors,
  Persona,
  PersonaSize,
  mergeStyleSets,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { useEffect, useState } from "react";
import { Form, Modal, NoData, Spinner } from "../components";
import connection from "../eWayAPI/Connector";
import { TContact, TContactsResopnse } from "../eWayAPI/ContactsResponse";
import { LoadingLayout } from "../layouts/LoadingLayout";
import { SectionLayout } from "../layouts/SectionLayout";

const list = mergeStyleSets({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  column: {
    flex: "1 1 50%",
    padding: "20px",
  },
  person: {
    cursor: "pointer",
    transition: "0.3s all ease-in-out",
    height: "100%",
    padding: "10px",
    selectors: {
      ":hover": {
        backgroundColor: NeutralColors.gray20,
      },
    },
  },
});

export const SearchContact = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [contact, setContact] = useState<TContact | undefined>();
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [error, setError] = useState("");

  const [recentlySearchedIds, setRecentlySearchedIds] = useState<string[]>([]);

  const [recentlySearchedContacts, setRecentlySearchedContacts] = useState<
    TContact[]
  >([]);
  const [isLoadingRecentlyContacts, setIsLoadingRecentlyContacts] =
    useState(false);
  const [recentlyContactsError, setRecentlyContactsError] = useState<
    string | null
  >(null);

  const getFullName = (firstName: string, lastName: string) =>
    firstName + " " + lastName;

  const handleOnSubmit = (email: string) => {
    setIsLoadingContact(true);
    connection.callMethod(
      "SearchContacts",
      {
        transmitObject: {
          Email1Address: email, // ealbares@gmail.com, oliver@hotmail.com, michael.ostrosky@ostrosky.com, kati.rulapaugh@hotmail.com, mroyster@royster.com and many others
        },
        includeProfilePictures: true,
      },
      (result: TContactsResopnse) => {
        if (result.Data.length === 0) {
          setIsLoadingContact(false);
          return setError("No contact found with this e-mail.");
        }

        const contact = result.Data[0];
        const contactId = contact.ItemGUID;
        setContact(contact);
        setIsLoadingContact(false);
        showModal();

        // Check if IDs in storage exist
        const recentlySearchedIdsStorage = JSON.parse(
          localStorage.getItem("recentlySearchedIds") as string
        ) as string[];

        // If not, save it as array
        if (!recentlySearchedIdsStorage) {
          setRecentlySearchedIds([contactId]);
          return localStorage.setItem(
            "recentlySearchedIds",
            JSON.stringify([contactId])
          );
        }
        // If yes, update IDs
        else {
          if (recentlySearchedIdsStorage.includes(contactId))
            return setRecentlySearchedIds(recentlySearchedIdsStorage);

          recentlySearchedIdsStorage.push(contactId);
          setRecentlySearchedIds(recentlySearchedIdsStorage);
          return localStorage.setItem(
            "recentlySearchedIds",
            JSON.stringify(recentlySearchedIdsStorage)
          );
        }
      }
    );
  };

  const handleOnClickPersona = (email: string) => {
    setIsLoadingContact(true);
    connection.callMethod(
      "SearchContacts",
      {
        transmitObject: {
          Email1Address: email,
        },
        includeProfilePictures: true,
      },
      (result: TContactsResopnse) => {
        setContact(result.Data[0]);
        setIsLoadingContact(false);
        showModal();
      }
    );
  };

  const clearRecentlySearched = () => {
    localStorage.removeItem("recentlySearchedIds");
    setRecentlySearchedIds([]);
    setRecentlySearchedContacts([]);
  };

  const refreshRecentlySearched = () => {
    getContactsByItemGuids(recentlySearchedIds);
  };

  const getContactsByItemGuids = (recentlySearchedIds: string[]) => {
    setIsLoadingRecentlyContacts(true);
    connection.callMethod(
      "GetContactsByItemGuids",
      {
        itemGuids: recentlySearchedIds,
        includeForeignKeys: true,
        includeRelations: false,
      },
      (result: TContactsResopnse) => {
        setRecentlySearchedContacts(result.Data);
        setIsLoadingRecentlyContacts(false);
      },
      (error: TContactsResopnse) => {
        setRecentlyContactsError(error.Description);
        setIsLoadingRecentlyContacts(false);
      }
    );
  };

  useEffect(() => {
    const recentlySearched = localStorage.getItem("recentlySearchedIds");
    if (recentlySearched)
      setRecentlySearchedIds(JSON.parse(recentlySearched) as []);
  }, []);

  useEffect(() => {
    if (recentlySearchedIds.length === 0) return;
    getContactsByItemGuids(recentlySearchedIds);
  }, [recentlySearchedIds]);

  return (
    <div>
      <SectionLayout header={{ label: "Search contact" }}>
        <Modal data={contact} isModalOpen={isModalOpen} hideModal={hideModal} />
        <Form
          onSubmit={(email: string) => handleOnSubmit(email)}
          error={error}
        />
      </SectionLayout>

      <SectionLayout
        header={{
          label: "Recently searched",
          buttons: [
            {
              label: "Clear",
              onClick: clearRecentlySearched,
              disabled: recentlySearchedContacts.length === 0,
            },
            {
              label: "Refresh",
              onClick: refreshRecentlySearched,
            },
          ],
        }}
      >
        <LoadingLayout
          isLoading={isLoadingRecentlyContacts}
          error={recentlyContactsError}
        >
          <div className={list.container}>
            {recentlySearchedContacts.length > 0 ? (
              <>
                {recentlySearchedContacts.map((person, index) => (
                  <div
                    className={list.column}
                    key={`${person.ItemGUID}-${index}`}
                  >
                    <Persona
                      onClick={() => handleOnClickPersona(person.Email1Address)}
                      className={list.person}
                      text={getFullName(person.FirstName, person.LastName)}
                      secondaryText={person.Email1Address}
                      size={PersonaSize.size56}
                    />
                  </div>
                ))}
              </>
            ) : (
              <NoData />
            )}
          </div>
        </LoadingLayout>
      </SectionLayout>

      <Spinner isLoading={isLoadingContact} />
    </div>
  );
};

// ealbares@gmail.com "0db3650f-bb87-4acc-96d6-9e6993cc6e61"
// oliver@hotmail.com "d33d95d7-039e-46b5-a687-258b9a9964ed"
// michael.ostrosky@ostrosky.com "13c13c37-54d7-42aa-b8e2-f3a70e019416"
