import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Box,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

const LayoutComponent = dynamic(() => import("@/layouts"));

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/notes");
  const data = await response.json();
  return { props: { data } };
}

export default function Notes({ data }) {
  const router = useRouter();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [itemDelete, setItemDelete] = useState();
  const [addNotes, setAddNotes] = useState({
    title: "",
    description: "",
  });
  const [notes, setNotes] = useState();

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  const AlertDelete = (item) => {
    setItemDelete(item);
    onDeleteOpen();
  };

  const HandleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes/add", {
        method: "POST",
        body: JSON.stringify(addNotes),
      });
      const result = await response.json();
      console.log("response : ", response);
      if (result?.success) router.reload();
    } catch (error) {}
  };

  const ModalAdd = (item) => {
    setNotes(item);
    onEditOpen();
  };

  const HandleUpdate = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/edit/${item?.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: notes?.title,
            description: notes?.description,
          }),
        }
      );
      const result = await response.json();
      console.log("update : ", result);
      if (result?.success) router.reload();
    } catch (error) {}
  };

  return (
    <LayoutComponent
      metaTitle={"Notes Page"}
      metaDescription={"Halaman notes web quis sanbercode"}
    >
      <Box padding="5">
        <Text fontSize="3xl" fontWeight="bold">
          List Notes
        </Text>
        <Flex justifyContent="end" alignItems="start" mb="5">
          <Button colorScheme="blue" onClick={onAddOpen}>
            Add Notes
          </Button>
        </Flex>

        <Flex justify="center">
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {data?.data.map((item) => (
              <>
                <GridItem key={item?.id}>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.description}</Text>
                    </CardBody>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button
                        onClick={() => ModalAdd(item)}
                        flex="1"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => AlertDelete(item)}
                        flex="1"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              </>
            ))}

            {/* Modal confirm delete */}
            <Modal
              closeOnOverlayClick={false}
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Notes?</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Text mb="1rem">
                    are you sure you want to delete notes{" "}
                    <Text fontWeight="bold"> {itemDelete?.title} </Text>
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    onClick={() => HandleDelete(itemDelete?.id)}
                  >
                    Delete
                  </Button>
                  <Button onClick={onDeleteClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* End modal confirm delete */}

            {/* Modal add notes */}
            <Modal isOpen={isAddOpen} onClose={onAddClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Notes</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="Title"
                      type="text"
                      onChange={(event) =>
                        setAddNotes({ ...addNotes, title: event.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Description"
                      onChange={(event) =>
                        setAddNotes({
                          ...addNotes,
                          description: event.target.value,
                        })
                      }
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => HandleSubmit()}
                  >
                    Add
                  </Button>
                  <Button onClick={onAddClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* End modal add notes */}

            {/* Modal Edit notes */}
            <Modal isOpen={isEditOpen} onClose={onEditClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Notes</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={notes?.title}
                      placeholder="Title"
                      type="text"
                      onChange={(event) =>
                        setNotes({ ...notes, title: event.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={notes?.description}
                      placeholder="Description"
                      onChange={(event) =>
                        setNotes({
                          ...notes,
                          description: event.target.value,
                        })
                      }
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => HandleUpdate(notes)}
                  >
                    Edit
                  </Button>
                  <Button onClick={onEditClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* End modal edit notes */}
          </Grid>
        </Flex>
      </Box>
    </LayoutComponent>
  );
}
