export interface UserMailRequest {
    emails: {
        name: string,
        email: string
    }[],
}

export interface UserMailSender {
    emails: {
      name: string,
      email: string,
      recieverToken: string,
      _id: string,
      createdAt: Date,
      updatedAt: Date,
    }[]
}
