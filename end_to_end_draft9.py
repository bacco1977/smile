# -*- coding: utf-8 -*-
"""
Created on Thu Sep  5 14:27:46 2019

@author: jacmckenna
"""

    # -*- coding: utf-8 -*-
"""
Created on Thu Aug 29 10:47:09 2019
    
@author: jacmckenna
"""
    
    # -*- coding: utf-8 -*-
"""
Created on Wed Aug 28 15:01:15 2019
    
@author: jacmckenna
"""
    
    ## First define our cnn and a function returning our similarity score
    
import sys
def score(image_path):
    
    from keras.models import Sequential
    from keras.layers import ZeroPadding2D, Convolution2D,MaxPooling2D, Dropout, Flatten, Activation
    
    model = Sequential()
    model.add(ZeroPadding2D((1,1),input_shape=(224,224, 3)))
    model.add(Convolution2D(64, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(64, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2,2), strides=(2,2)))
     
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(128, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(128, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2,2), strides=(2,2)))
     
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(256, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(256, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(256, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2,2), strides=(2,2)))
     
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(512, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(512, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(512, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2,2), strides=(2,2)))
     
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(512, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(512, (3, 3), activation='relu'))
    model.add(ZeroPadding2D((1,1)))
    model.add(Convolution2D(512, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2,2), strides=(2,2)))
     
    model.add(Convolution2D(4096, (7, 7), activation='relu'))
    model.add(Dropout(0.5))
    model.add(Convolution2D(4096, (1, 1), activation='relu'))
    model.add(Dropout(0.5))
    model.add(Convolution2D(2622, (1, 1)))
    model.add(Flatten())
    model.add(Activation('softmax'))
    
    
    
    from keras.models import model_from_json
    model.load_weights('vgg_face_weights.h5')
    
    from keras.models import Model
    
    vgg_face_descriptor = Model(inputs=model.layers[0].input
    , outputs=model.layers[-2].output)
    
    
    from keras.preprocessing.image import load_img, img_to_array
    from keras.applications.resnet50 import preprocess_input
    import numpy as np
    from numpy import expand_dims
    
    def preprocess_image(image_path):
        dim = (224, 224)
        img = cv2.resize(image_path, dim, interpolation = cv2.INTER_AREA)
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = preprocess_input(img)
        return img
    
    
    
    
    def findCosineDistance(source_representation, test_representation):
        a = np.matmul(np.transpose(source_representation), test_representation)
        b = np.sum(np.multiply(source_representation, source_representation))
        c = np.sum(np.multiply(test_representation, test_representation))
        return 1 - (a / (np.sqrt(b) * np.sqrt(c)))
     
    def findEuclideanDistance(source_representation, test_representation):
        euclidean_distance = source_representation - test_representation
        euclidean_distance = np.sum(np.multiply(euclidean_distance, euclidean_distance))
        euclidean_distance = np.sqrt(euclidean_distance)
        return euclidean_distance
    
    def verifyFace(img1, img2):
     img1_representation = vgg_face_descriptor.predict(preprocess_image(img1))[0,:]
     img2_representation = vgg_face_descriptor.predict(preprocess_image(img2))[0,:]
     
     cosine_similarity = findCosineDistance(img1_representation, img2_representation)
     euclidean_distance = findEuclideanDistance(img1_representation, img2_representation)
    
     return cosine_similarity
    
    
    ## Next let's define everything else we need for our function to run
     
    # Just importing the modules we'll need
    import numpy as np
    import dlib
    import cv2
    import math
    
    # This takes our facial landmarks and converts them to (x,y) coordinates
    
    def shape_to_np(shape, dtype="int"):
        # initialize the list of (x, y)-coordinates
        coords = np.zeros((68, 2), dtype=dtype)
     
        # loop over the 68 facial landmarks and convert them
        # to a 2-tuple of (x, y)-coordinates
        for i in range(0, 68):
            coords[i] = (shape.part(i).x, shape.part(i).y)
     
        # return the list of (x, y)-coordinates
        return coords
    
    
    
    ## This dlib package has the shape_predictor function which will give our
    ## landmarks
    ## shape_predictor.dat is a file containing this predictor
    
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("shape_predictor.dat")
    
    
    # this stuff from here on is to do the coordinate transformation talked about 
     # in the average face implementation
    
    def similarityTransform(inPoints, outPoints) :
        s60 = math.sin(60*math.pi/180)
        c60 = math.cos(60*math.pi/180)  
      
        inPts = np.copy(inPoints).tolist()
        outPts = np.copy(outPoints).tolist()
        
        xin = c60*(inPts[0][0] - inPts[1][0]) - s60*(inPts[0][1] - inPts[1][1]) + inPts[1][0]
        yin = s60*(inPts[0][0] - inPts[1][0]) + c60*(inPts[0][1] - inPts[1][1]) + inPts[1][1]
        
        inPts.append([np.int(xin), np.int(yin)])
    
        xout = c60*(outPts[0][0] - outPts[1][0]) - s60*(outPts[0][1] - outPts[1][1]) + outPts[1][0]
        yout = s60*(outPts[0][0] - outPts[1][0]) + c60*(outPts[0][1] - outPts[1][1]) + outPts[1][1]
        
        outPts.append([np.int(xout), np.int(yout)])
        
        
        ## experimenting with the code here to replace estimateAffinePartial2D with estimaterigidtransform
        ## this works
        ## bug in the orignal produces identity matrix with integer inputs
        tform = cv2.estimateRigidTransform(np.array([inPts]), np.array([outPts]), fullAffine = False)
        
        return tform
    
    def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
        # initialize the dimensions of the image to be resized and
        # grab the image size
        dim = None
        (h, w) = image.shape[:2]
    
        # if both the width and height are None, then return the
        # original image
        if width is None and height is None:
            return image
    
        # check to see if the width is None
        if width is None:
            # calculate the ratio of the height and construct the
            # dimensions
            r = height / float(h)
            dim = (int(w * r), height)
    
        # otherwise, the height is None
        else:
            # calculate the ratio of the width and construct the
            # dimensions
            r = width / float(w)
            dim = (width, int(h * r))
    
        # resize the image
        resized = cv2.resize(image, dim, interpolation = inter)
    
        # return the resized image
        return resized
    
    def score_from_image(image_path): 
    
        print("loading imagepath" + image_path)
        image = cv2.imread(image_path)
        image = image_resize(image, width=500)
        rects = detector(image, 1)
        for (i, rect) in enumerate(rects):
            # determine the facial landmarks for the face region, then
            # convert the facial landmark (x, y)-coordinates to a NumPy
            # array
            shape = predictor(image, rect)
            shape = shape_to_np(shape)
    
        w = 500
        h = image.shape[0]
    
        ## This is setting where we want the eyes to be located in the output image
        eyecornerDst = [ (np.int(0.3 * w ), np.int(h / 3)), (np.int(0.7 * w ), np.int(h / 3)) ]
                
                # Corners of the eye in input image
        eyecornerSrc  = [ shape[36], shape[45] ] 
                
                # Compute similarity transform
        tform = similarityTransform(eyecornerSrc, eyecornerDst)
                
                # Apply similarity transformation
        img = cv2.warpAffine(image, tform, (w,h))
    
        left_crop_img = img[0:h, 0:round(w/2)].copy()
        right_crop_img = img[0:h, round(w/2):w].copy()
    
        ## flip both cropped images
        left_crop_flip_img = cv2.flip(left_crop_img, 1)
        right_crop_flip_img = cv2.flip(right_crop_img, 1)
    
        ## join them together 
        left_flipped = cv2.hconcat([left_crop_img, left_crop_flip_img])
        right_flipped = cv2.hconcat([right_crop_flip_img, right_crop_img])
    
        similarity_score =  verifyFace(left_flipped,right_flipped)


        print ("similarity_score" + str(similarity_score))
    
    
        return similarity_score
    
    return score_from_image(image_path) 
    
    
    
    
    
    
# if __name__ == "__main__":
#    main(sys.argv[1])