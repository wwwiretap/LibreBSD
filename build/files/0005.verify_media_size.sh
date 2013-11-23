#!/bin/sh
#
# Make sure the target disk is big enough to install on.
#
# Garrett Cooper, March 2012

. /etc/avatar_img_size.conf

media_size=$(diskinfo $INSTALL_MEDIA | awk '{ print $3 }')

# NOTE: automatically generated by ${0##*/}
if [ ${media_size:-0} -lt $IMG_SIZE ]
then
	error "install target media ($INSTALL_MEDIA) is too small ($media_size < $IMG_SIZE)"
fi
