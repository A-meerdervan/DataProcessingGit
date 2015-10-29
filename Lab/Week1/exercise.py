# Name : Alex van der Meer	
# Student number : 10400958
'''
I have made two functions here, because at first I misunderstood the assignment
and I thought that I should separate on a set, concatenated sequence of symbols
however this was not the case, the symbols can be in random order. 
So I wasted ALLOT of time. To still show you this beatiful function which you might need 
at some point in your life :P I still added it.

So the split_string2 function is the wrong one, but beatiful
the split_string function is the right one, but less elegant

both functions are robust in that the separator sequences can be at the front and back
but also not at the front or the back. 
'''


def split_string2(Source, Separators):
	Results = []
	# This is used so the source can be sliced up into peaces
	PreviousSliceIndex = 0
	# Only when the number of characters that can still be searched is 
	# more or equal to the amount of seperator characters, is it of use to search 
	RangeEnd = len(Source) - len(Separators) + 1
	# The situation changes when there is a Separator at the end of the source, so keep track of this
	SeparatorAtEnd = False
	# per starting index, it is checked wheter the next characters build up to a separation sequence
	# for efficiency the loop breaks after one letter of the sequence that does not match
	for Index in range(0, RangeEnd):
		for i in range(0, len(Separators)):
			if Source[Index + i] == Separators[i]:
				if i == (len(Separators) - 1):
					# If the separator is at the end, Do not add the separator itself
					if Index + i == len(Source) - 1:
						Results.append(Source[PreviousSliceIndex : Index])
						SeparatorAtEnd = True
					# If at the first index there is a separator do not add to results yet
					elif Index != 0:
						Results.append(Source[PreviousSliceIndex : Index])
					PreviousSliceIndex = Index + len(Separators)
			else: break
	#  If no separator at the end, the last peace ends at the end of the source
	if not SeparatorAtEnd:
		Results.append(Source[PreviousSliceIndex : len(Source)])
	return Results

def split_string(Source, Separators):
	Results = []
	# This is used so the source can be sliced up into peaces
	PreviousSliceIndex = 0
	# This is the end of the range of indexes that will be looped
	RangeEnd = len(Source)
	# Per index, it is checked wheter it or next char's are separation chars
	# The situation is different when there is a Separator in front so this is checked
	SeparatorNotInFront = True
	Index = 0
	while Index in range(0, RangeEnd):
		j = 0
		StillSeparators = True
		# check next char until it is not a separator char
		while StillSeparators:
			# if the char is a separtor, go to next loop
			if Source[Index + j] in Separators:
				j = j + 1
				# If the separator char is the last of the source input, stop both while loops
				# and add the last word
				if Index + j == RangeEnd:
					Results.append(Source[PreviousSliceIndex : Index])
					StillSeparators = False
					Index = RangeEnd + 1
				# If the Source starts with a separator this means later on that previousSlice must not remain 0
				if Index == 0:
					SeparatorNotInFront = False
			# The char is not a separator
			else: 
				StillSeparators = False
				# If this is true there was a separator so add to previous part
				if j > 0 and SeparatorNotInFront:
					Results.append(Source[PreviousSliceIndex : Index])
					Index = Index + j
					PreviousSliceIndex = Index
				# Only the first loop may get here if the first char is a separator, then previousSlice must be changed
				elif j > 0:
					PreviousSliceIndex = Index + j
					Index = Index + j
					SeparatorNotInFront = True
				# The last char in the source was not a separator so add the last peace
				elif Index == RangeEnd -1:
					Results.append(Source[PreviousSliceIndex : RangeEnd])
					Index = RangeEnd
				# There was no separator at all so go to next index
				else:
					Index = Index + 1	
	return Results
	

if __name__ == '__main__':
	print split_string('qabacad g11a222a33babbaba444abrarrr', 'ba') # should print: ['q', 'c', 'd g11', '222', '33', '444', 'r', 'rrr']
	print split_string2("8w8Huis8w8Boom8w8Steen8w8", "8w8") # should print: ['Huis', 'Boom', 'Steen']
	print split_string("abacadabra","ba") # should print: ['c', 'd', 'r']