import {Hint, HintOut} from "../types";
import {useContext, useState} from "react";
import {AuthContext} from "../App";

interface AddFeedbackModalProps {
  close: () => void;
}

export function AddFeedbackModal(props: AddFeedbackModalProps) {
  const {state} = useContext(AuthContext);
  const {close} = props;

  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [content, setContent] = useState("");
  const [contentErr, setContentErr] = useState(false);
  const [type, setType] = useState<Hint["type"]>("feedback");
  const [modalError, setModalError] = useState("");

  const postHint = async (hint: HintOut) => {
    const token = "token" in state.user ? state.user.token : "";
    const res = await fetch(`${state.server_url}/v1/hint`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(hint),
    })

    const {error} = await res.json()

    if (error) {
      throw new Error(error)
    }

    return res
  }

  const toggleType = () => {
    if (type === "feedback") {
      setType("proposal");
    } else {
      setType("feedback");
    }
  }

  const submit = async () => {
    setTitleErr(title.length == 0);
    setContentErr(content.length == 0);

    if (title.length == 0 || content.length == 0) {
      return;
    }

    if ("name" in state.user) {
      const h: HintOut = {
        title: title,
        body: content,
        type: type,
        author: {
          name: state.user?.name || "",
        }
      }

      const res = await postHint(h)

      if (res.status < 400) {
        close();
      } else {
        setModalError("Error submitting feedback, please try again later.")
      }
    } else {
      setModalError("You must be logged in to submit feedback");
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-[101] overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Add new feedback</h3>
                  <div className="mt-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
                    <input type="text" id="title"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Event X was awesome!"
                           value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    {titleErr && <p className="text-red-500 text-sm">Title is required</p>}
                  </div>
                  <div className="mt-2">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium">Type</label>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input id="type" type="checkbox" value="" className="sr-only peer"/>
                      <span className="ml-3 mr-3 text-sm font-medium select-none">Feedback</span>
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[90px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"
                        onClick={() => toggleType()}/>
                      <span className="ml-3 text-sm font-medium select-none">Proposal</span>
                    </label>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium">Content</label>
                    <textarea id="content"
                              className="block p-2.5 h-60 w-full text-sm text-gray-900 bg-gray-50 rounded-lg resize-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Write your thoughts here..."
                              value={content} onChange={(e) => setContent(e.target.value)} required/>
                    {contentErr && <p className="text-red-500 text-sm">Content is required</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              {modalError && <p className="text-red-500 text-sm text-center">{modalError}</p>}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={submit}
              >
                Confirm
              </button>
              <button type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={close}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
