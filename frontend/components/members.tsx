"use client"; // Marks component as a client component

import React, { useState } from "react";
import Head from "next/head";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table";

type Member = {
  name: string;
  email: string;
  permissions: "All" | "Some";
  designation: "Super Admin" | "Sub Admin";
};

const MemberTable: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    { name: "Keshav", email: "keshav@gmail.com", permissions: "All", designation: "Super Admin" },
    { name: "Somya", email: "somya@gmail.com", permissions: "All", designation: "Sub Admin" },
    { name: "Kanishka", email: "kanishka@gmail.com", permissions: "Some", designation: "Sub Admin" },
    { name: "Harshit", email: "harshit@gmail.com", permissions: "Some", designation: "Sub Admin" },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newMember, setNewMember] = useState<Member>({ name: "", email: "", permissions: "Some", designation: "Sub Admin" });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const removeMember = (index: number) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (newMember.name && newMember.email) {
      setMembers([...members, newMember]);
      setNewMember({ name: "", email: "", permissions: "Some", designation: "Sub Admin" });
    }
  };

  const editMember = (index: number) => {
    const memberToEdit = members[index];
    setNewMember(memberToEdit);
    setEditIndex(index);
  };

  const updateMember = () => {
    if (editIndex !== null && newMember.name && newMember.email) {
      const updatedMembers = [...members];
      updatedMembers[editIndex] = newMember;
      setMembers(updatedMembers);
      setNewMember({ name: "", email: "", permissions: "Some", designation: "Sub Admin" });
      setEditIndex(null);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-black text-white rounded-lg">
      <h2 className="text-2xl mb-4">Members</h2>
      <div className="flex w-full mb-4">
        <Input
          type="text"
          placeholder="Search members"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 text-gray-600"
        />
      </div>

      <div className="flex w-full mb-4">
        <Input
          type="text"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className="w-full p-2 mb-4 text-gray-600 mr-4"
        />
        <Input
          type="email"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          className="w-full p-2 mb-4 text-gray-600"
        />
        <Button
          variant="outline"
          onClick={editIndex !== null ? updateMember : addMember}
          className="text-gray-600 ml-4"
        >
          {editIndex !== null ? "Update" : "Add"}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => editMember(index)}
                    className="text-gray-600"
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => removeMember(index)}
                    className="text-gray-600"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Member: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Manage members and permissions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 sm:p-10">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <MemberTable />
      </main>
    </div>
  );
};

export default Member;