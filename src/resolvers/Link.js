
function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy()
  // postedBy() function = postedBy field
}

module.exports = {
  postedBy,
}