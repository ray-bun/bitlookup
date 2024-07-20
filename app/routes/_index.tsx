import React, { useState } from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData, Link } from "@remix-run/react";
import Footer from "~/components/Footer";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import NeedHelp from "~/components/NeedHelp";
// Define the structure of our CSV data
interface KeyEntry {
  machine_serial: string;
  key_1: string;
  key_2: string;
}

const filePath = process.env.CSV_FILEPATH;

export const loader: LoaderFunction = async () => {
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
  return json(records);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const serialKey = formData.get("serialKey") as string;

  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const records: KeyEntry[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const entry = records.find((entry) => entry.machine_serial.toLowerCase() === serialKey.toLowerCase());
  return json({
    result: entry ? { key_1: entry.key_1, key_2: entry.key_2 } : "No matching keys found.",
  });
};
export default function Index() {
  const csvData = useLoaderData<KeyEntry[]>();
  const actionData = useActionData();
  const [serialKey, setSerialKey] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-50 via-indigo-50 to-white dark:from-blue-950 dark:via-indigo-950 dark:to-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 flex flex-col flex-grow">
        {/* Main Header */}
        <header id="page-header" className="py-8">
          <Link to="/" className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
            <svg
              className="hi-outline hi-magnifying-glass inline-block size-6 text-gray-400 transition duration-200 group-hover:scale-110 group-active:scale-100 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span>BITLookup</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="flex w-full max-w-7xl space-x-16">
            {/* Main content on the left */}
            <div className="w-1/2">
              <h1 className="mb-6 text-5xl font-black tracking-tight text-black dark:text-white">BitLocker Recovery Finder</h1>
              <h2 className="mb-8 text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">Recover faster from the CrowdStrike incident with our BitLocker Recovery Finder</h2>
              <div className="mb-8 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                API Endpoint: https://bitlookup.net/search/xxxxxxxx
              </div>
              <Form method="post" className="mb-8">
                <div className="flex items-center rounded-xl bg-white shadow-md dark:bg-gray-800">
                  <input
                    type="text"
                    id="serialKey"
                    name="serialKey"
                    placeholder="Enter machine serial key"
                    className="block w-full rounded-l-xl border-0 px-5 py-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 dark:focus:ring-blue-500"
                    value={serialKey}
                    onChange={(e) => setSerialKey(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="rounded-r-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Find
                  </button>
                </div>
              </Form>
              {actionData?.result && (
                <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                  <h3 className="text-xl font-semibold mb-4">Your BitLocker keys:</h3>
                  {typeof actionData.result === "string" ? (
                    <p className="text-gray-700 dark:text-gray-300">{actionData.result}</p>
                  ) : (
                    <>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Key 1: {actionData.result.key_1}</p>
                      <p className="text-gray-700 dark:text-gray-300">Key 2: {actionData.result.key_2}</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Video on the right */}
            <div className="w-1/2 flex flex-col">
              <div className="flex-grow relative overflow-hidden rounded-lg shadow-lg">
                <iframe
                  src="https://www.canva.com/design/DAGLhqBgZOs/nc8zqG2dNZ5fr5RQD8_x9Q/watch?embed"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allowFullScreen
                  allow="fullscreen"
                />
              </div>
            </div>
          </div>
        </main>

        {/* Banner at the bottom, aligned with the container */}
        <div className="mt-auto mb-8">
          <img src="/sample1.png" alt="Banner" className="w-full h-auto object-cover object-center rounded-lg shadow-md" />
        </div>
      </div>
      <NeedHelp />
      <Footer />
    </div>
  );
}
